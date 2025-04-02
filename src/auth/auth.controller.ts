import { Body, Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { SignInDto } from "./dto/signIn.dto"
import { SignUpDto } from "./dto/signUp.dto"

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	async signIn(@Body() dto: SignInDto) {
		return await this.authService.signIn(dto)
	}

	@Post("register")
	async signUp(@Body() dto: SignUpDto) {
		return await this.authService.signUp(dto)
	}
}
