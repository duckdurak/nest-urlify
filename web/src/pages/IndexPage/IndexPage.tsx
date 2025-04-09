import { useEffect } from "react"
import { Body } from "../../components/Body/Body"
import { Header } from "../../components/Header/Header"
import { Navbar } from "../../components/Navbar/Navbar"
import { UrlShortener } from "../../components/UrlShortener/UrlShortener"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { isAuth } from "../../store/slices/user.slice"

export const IndexPage: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (window.localStorage.getItem("access_token")) {
			dispatch(isAuth())
		}
	}, [dispatch])

	const isLoggedIn = useAppSelector(state => state.user.isAuth)

	return (
		<Body>
			<Header />
			{isLoggedIn ? (
				<div className="flex w-full h-full justify-center items-center">
					<div className="flex flex-col space-y-6 w-[80%] max-w-[900px] shadow-box p-6 rounded-2xl">
						<p className="text-2xl text-center mb-2">Создание ссылки</p>
						<Navbar />
						<UrlShortener />
					</div>
				</div>
			) : (
				<div className="flex w-full h-full justify-center items-center">
					<div className="flex flex-col space-y-6 w-[80%] max-w-[900px] p-6 rounded-2xl">
						<h1 className="text-center text-3xl">Сократи свою ссылку</h1>
						<UrlShortener />
					</div>
				</div>
			)}
		</Body>
	)
}
