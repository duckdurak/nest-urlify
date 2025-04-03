import { UnauthorizedException } from "@nestjs/common"

export class CustomUnauthorizedException extends UnauthorizedException {
	constructor(message?: string) {
		super(message || "You must be authenticated to perform this action", {
			description: "Unauthorized",
			cause: null,
		})
	}
}
