import { User } from "@user/entities/user.entity"

export type TJwtPayload = {
	id: string
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
