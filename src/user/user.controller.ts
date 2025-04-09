import { AuthGuardStrict } from "@auth/auth.guard"
import { UserContext } from "@decorators/UserContext.decorator"
import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common"
import { User } from "@user/entities/user.entity"
import { UserService } from "@user/user.service"
import { Response } from "express"
import { TResponse } from "src/types"
import { UpdatePasswordDto, UpdatePasswordWithAuthDto } from "./dto/update.dto"

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuardStrict)
	@Post("password")
	async updatePassword(
		@UserContext() userObject: User,
		@Body() dto: UpdatePasswordDto,
		@Res() res: Response
	) {
		const new_dto = new UpdatePasswordWithAuthDto(dto, userObject)

		await this.userService.updatePassword(new_dto)

		const response: TResponse<null> = {
			message: null,
			error: "No Error",
			statusCode: 200,
		}

		return res.status(200).json(response)
	}
}
