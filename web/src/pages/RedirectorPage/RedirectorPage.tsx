import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BACKEND_API } from "../../axios"
import { TResponse, TUrl } from "../../types"
import { LoadingPage } from "../LoadingPage/LoadingPage"
import { NotFoundPage } from "../NotFoundPage/NotFoundPage"

const getUrlProperties = async (alias: string): Promise<boolean> => {
	const response = (await BACKEND_API.get("/api/url/" + alias).then(
		res => {
			return res.data
		},
		res => {
			return res.response?.data
		}
	)) as TResponse<TUrl>

	if (response.statusCode === 200) {
		window.location.replace(response.message.url)
		return true
	}

	return false
}

export const RedirectorPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { alias } = useParams()

	useEffect(() => {
		if (alias) {
			setIsLoading(true)
			getUrlProperties(alias).then(isOK => !isOK && setIsLoading(false))
		}
	}, [alias])

	if (isLoading) {
		return <LoadingPage />
	}

	return <NotFoundPage />
}
