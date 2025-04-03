import { IsEmail, IsString, IsUUID } from "class-validator"

export class FindOneByEmailDto {
	@IsEmail()
	email: string
}

export class FindOneByIdDto {
	@IsUUID()
	id: string
}

export class FindOneByUsernameDto {
	@IsString()
	username: string
}
