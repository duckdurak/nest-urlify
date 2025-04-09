import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { isAuth } from "../../store/slices/user.slice"

type Props = { children: React.ReactNode }

export const ProtectedPage: React.FC<Props> = ({ children }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (window.localStorage.getItem("access_token")) {
			dispatch(isAuth())
		}
	}, [])

	const isLogginingIn = useAppSelector(state => state.user.isLoading)
	const isLoggedIn = useAppSelector(state => state.user.isAuth)

	if (isLogginingIn) {
		return <p>Loading...</p>
	}

	if (isLoggedIn) {
		return children
	} else {
		return <Navigate to={"/"}></Navigate>
	}
}
