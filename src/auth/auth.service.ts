import { CustomUnauthorizedException } from "@exceptions/UnauthorizedException"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { CreateByUsername } from "@user/dto/createBy.dto"
import { User } from "@user/entities/user.entity"
import { UserService } from "@user/user.service"
import { compare, genSalt, hash } from "bcrypt"
import { TJwtPayload, TSignInResponse } from "src/types"
import { SignInDto } from "./dto/signIn.dto"
import { SignUpDto } from "./dto/signUp.dto"

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) {}

	async signIn(dto: SignInDto): Promise<TSignInResponse | string> {
		const { username, password } = dto

		const user = await this.usersService.findOneByUsername({
			username: username,
		})

		if (!user) {
			throw new CustomUnauthorizedException("Username or password is incorrect")
		}

		const isCorrect = await compare(password, user.password)

		if (!isCorrect) {
			return "Username or password is incorrect"
		}

		const payload: TJwtPayload = { id: user.id, user: user }
		const jwtPayload = await this.jwtService.signAsync(payload)

		const res: TSignInResponse = { access_token: jwtPayload, user: user }

		return res
	}

	async signUp(dto: SignUpDto): Promise<User | string> {
		const { username, password } = dto

		const user = await this.usersService.findOneByUsername({
			username: username,
		})

		if (user) {
			return "User with such username is already exist"
		}

		const salt = await genSalt()
		const hashedPassword = await hash(password, salt)

		const create_dto: CreateByUsername = {
			username: username,
			hashedPassword: hashedPassword,
		}

		const created_user = await this.usersService.createByUsername(create_dto)

		return created_user
	}
}
