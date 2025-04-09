export type TResponse<T> = {
	message: T
	error: string
	statusCode: number
}

export type TRoute = {
	path: string
	element: React.ReactNode
	icon: React.ReactNode
	title: string
}

export type TUser = {
	id: string
	username: string
	password: string
	created_at: string
}

export type TSignInResponse = {
	access_token: string
	user: TUser
}

export type TSignUpResponse = TSignInResponse

export type TUrl = {
	id: string
	alias: string
	url: string
	clicks: number
	user?: TUser | null
	created_at: string
	expiry_at: string
}

export type TGetUrlsResponse = {
	urls: TUrl[]
	totalCount: number
	page: number
	perPage: number
}
