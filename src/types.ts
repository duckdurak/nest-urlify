import { User } from "@user/entities/user.entity"
import { Request } from "express"

export type TJwtPayload = {
	id: string
}

export type CustomRequest = Request & {
	user: User
}

export type TDefaultResponse<T> = {
	message: T
	error: string
	statusCode: number
}

export type TSignInResponse = {
	access_token: string
	user: User
}
