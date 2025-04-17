import { useEffect, useMemo } from "react"
import { Navigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { isAuth } from "../../store/slices/user.slice"
import { LoadingPage } from "../LoadingPage/LoadingPage"

type Props = { children: React.ReactNode }

export const ProtectedPage: React.FC<Props> = ({ children }) => {
	const dispatch = useAppDispatch()

	const memoizedChildren = useMemo(() => children, [children])

	const isInitialCheckComplete = useAppSelector(
		state => state.user.isInitialCheckComplete
	)
	const isLoggedIn = useAppSelector(state => state.user.isAuth)
	const isLoading = useAppSelector(state => state.user.isLoading)

	useEffect(() => {
		if (
			window.localStorage.getItem("access_token") &&
			!isInitialCheckComplete
		) {
			dispatch(isAuth())
		}
	}, [dispatch, isInitialCheckComplete])

	if (!isInitialCheckComplete && isLoading) {
		return <LoadingPage />
	}

	if (isLoggedIn) {
		return memoizedChildren
	} else {
		return <Navigate to={"/"} replace></Navigate>
	}
}
