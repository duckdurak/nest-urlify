import { User } from "@user/entities/user.entity"
import { IsString } from "class-validator"

export class UpdatePasswordDto {
	@IsString()
	old_password: string

	@IsString()
	new_password: string
}

export class UpdatePasswordWithAuthDto extends UpdatePasswordDto {
	userObject: User

	constructor(old_dto: UpdatePasswordDto, userObject: User) {
		super()
		this.old_password = old_dto.old_password
		this.new_password = old_dto.new_password
		this.userObject = userObject
	}
}
