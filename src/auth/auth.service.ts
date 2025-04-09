import { CustomBadRequestException } from "@exceptions/BadRequest.exception"
import { CustomUnauthorizedException } from "@exceptions/Unauthorized.exception"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { CreateByUsername } from "@user/dto/create.dto"
import { UserService } from "@user/user.service"
import { compare, genSalt, hash } from "bcrypt"
import { TJwtPayload, TSignInResponse, TSignUpResponse } from "src/types"
import { SignInDto } from "./dto/signIn.dto"
import { SignUpDto } from "./dto/signUp.dto"

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) {}

	async signIn(dto: SignInDto): Promise<TSignInResponse> {
		const { username, password } = dto

		const user = await this.usersService.findOneByUsername(username)

		if (!user) {
			throw new CustomUnauthorizedException("Username or password is incorrect")
		}

		const isCorrect = await compare(password, user.password)

		if (!isCorrect) {
			throw new CustomUnauthorizedException("Username or password is incorrect")
		}

		const payload: TJwtPayload = { id: user.id }
		const jwtPayload = await this.jwtService.signAsync(payload)

		const res: TSignInResponse = { access_token: jwtPayload, user: user }

		return res
	}

	async signUp(dto: SignUpDto): Promise<TSignUpResponse> {
		const { username, password } = dto

		const user = await this.usersService.findOneByUsername(username)

		if (user) {
			throw new CustomBadRequestException(
				"User with such username is already exist"
			)
		}

		const salt = await genSalt()
		const hashedPassword = await hash(password, salt)

		const create_dto: CreateByUsername = {
			username: username,
			hashedPassword: hashedPassword,
		}

		const created_user = await this.usersService.createByUsername(create_dto)

		const payload: TJwtPayload = { id: created_user.id }
		const jwtPayload = await this.jwtService.signAsync(payload)

		const res: TSignUpResponse = {
			access_token: jwtPayload,
			user: created_user,
		}

		return res
	}
}
