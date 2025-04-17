import axios from "axios"

const BACKEND =
	!process.env.NODE_ENV || process.env.NODE_ENV === "development"
		? "http://localhost:8000/"
		: ""

export const BACKEND_API = axios.create({
	baseURL: BACKEND,
})

BACKEND_API.interceptors.request.use(config => {
	config.headers.Authorization =
		"Bearer " + window.localStorage.getItem("access_token")
	return config
})
