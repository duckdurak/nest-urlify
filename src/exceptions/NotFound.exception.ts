import { NotFoundException } from "@nestjs/common"

export class CustomNotFoundException extends NotFoundException {
	constructor(message?: string) {
		super(message || "The requested data wasn't found on the server", {
			description: "Not Found",
			cause: null,
		})
	}
}
