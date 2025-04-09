import { UserContext } from "@decorators/UserContext.decorator"
import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common"
import { User } from "@user/entities/user.entity"
import { Response } from "express"
import { TResponse, TSignInResponse, TSignUpResponse } from "src/types"
import { AuthGuardStrict } from "./auth.guard"
import { AuthService } from "./auth.service"
import { SignInDto } from "./dto/signIn.dto"
import { SignUpDto } from "./dto/signUp.dto"

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuardStrict)
	@Get("isAuth")
	isAuth(@UserContext() userObject: User, @Res() res: Response) {
		const response: TResponse<User> = {
			message: userObject,
			error: "No Error",
			statusCode: 200,
		}

		return res.status(200).json(response)
	}

	@Post("login")
	async signIn(@Body() dto: SignInDto, @Res() res: Response) {
		const message = await this.authService.signIn(dto)

		const response: TResponse<TSignInResponse> = {
			message,
			error: "No Error",
			statusCode: 200,
		}

		return res.status(200).json(response)
	}

	@Post("register")
	async signUp(@Body() dto: SignUpDto, @Res() res: Response) {
		const message = await this.authService.signUp(dto)

		const response: TResponse<TSignUpResponse> = {
			message,
			error: "No Error",
			statusCode: 200,
		}

		return res.status(200).json(response)
	}
}
