import { CustomUnauthorizedException } from "@exceptions/Unauthorized.exception"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "@user/user.service"
import { Request } from "express"
import { TJwtPayload } from "src/types"

const extractTokenFromHeader = (request: Request): string | undefined => {
	const [type, token] = request.headers.authorization?.split(" ") ?? []
	return type === "Bearer" ? token : undefined
}

@Injectable()
export class AuthGuardStrict implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest()
		const token = extractTokenFromHeader(request)
		if (!token) {
			throw new CustomUnauthorizedException()
		}
		try {
			const payload: TJwtPayload = await this.jwtService.verifyAsync(token)
			const userObject = await this.userService.findOneById(payload.id)

			if (!userObject) {
				throw new CustomUnauthorizedException()
			}

			request["user"] = userObject
		} catch {
			throw new CustomUnauthorizedException()
		}
		return true
	}
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest()
		const token = extractTokenFromHeader(request)
		if (!token) {
			return true
		}
		try {
			const payload: TJwtPayload = await this.jwtService.verifyAsync(token)
			const userObject = await this.userService.findOneById(payload.id)

			if (!userObject) {
				return true
			}

			request["user"] = userObject
		} catch {
			return true
		}
		return true
	}
}
