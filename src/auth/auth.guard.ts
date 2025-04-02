import { CustomUnauthorizedException } from "@exceptions/UnauthorizedException"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { TJwtPayload } from "src/types"

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		if (!token) {
			throw new CustomUnauthorizedException()
		}
		try {
			const payload: TJwtPayload = await this.jwtService.verifyAsync(token)
			request["user"] = payload.user
			request["user_id"] = payload.id
		} catch {
			throw new CustomUnauthorizedException()
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? []
		return type === "Bearer" ? token : undefined
	}
}
