import { User } from "@user/entities/user.entity"
import { IsDateString, IsOptional, IsUrl } from "class-validator"

export class CreateUrlDto {
	@IsUrl({ require_protocol: true })
	url: string

	@IsOptional()
	@IsDateString()
	expiry_at: string
}

export class CreateUrlWithAuthDto extends CreateUrlDto {
	user: User

	constructor(old_dto: CreateUrlDto, user: User) {
		super()
		this.url = old_dto.url
		this.expiry_at = old_dto.expiry_at
		this.user = user
	}
}
