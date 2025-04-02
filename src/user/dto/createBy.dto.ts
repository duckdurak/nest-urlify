import { IsEmail, IsString } from "class-validator"

export class CreateByEmail {
	@IsEmail()
	email: string

	@IsString()
	hashedPassword: string
}

export class CreateByUsername {
	@IsEmail()
	username: string

	@IsString()
	hashedPassword: string
}
