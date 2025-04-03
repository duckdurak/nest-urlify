import { BadRequestException } from "@nestjs/common"

export class CustomBadRequestException extends BadRequestException {
	constructor(message?: string) {
		super(message || "You must enter a valid data", {
			description: "Bad Request",
			cause: null,
		})
	}
}
