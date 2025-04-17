import { IsDateString } from "class-validator"

export class UpdateUrlDto {
	@IsDateString()
	expiry_at: string
}
