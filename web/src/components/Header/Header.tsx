import {
	faArrowRightToBracket,
	faSignOut,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { logout } from "../../store/slices/user.slice"
import { Button } from "../Button/Button"
import { LoginModal } from "../LoginModal/LoginModal"
import { RegisterModal } from "../RegisterModal/RegisterModal"

type Props = {}

export const Header: React.FC<Props> = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [loginModal, setLoginModal] = useState(false)
	const [registerModal, setRegisterModal] = useState(false)

	const isAuth = useAppSelector(state => state.user.isAuth)
	const user = useAppSelector(state => state.user.user)

	return isAuth ? (
		<header className="flex w-full justify-end md:justify-between items-center absolute top-0 right-0 p-6">
			<img
				onClick={() => navigate("/")}
				src="/logo.png"
				alt="logo"
				className="w-fit h-12 hidden md:block cursor-pointer"
			/>
			<div className="flex items-center space-x-4">
				<p className="text-lg hidden md:block">Привет, {user.username}!</p>
				<Button
					onClick={() => dispatch(logout())}
					icon={<FontAwesomeIcon icon={faSignOut} />}
				>
					Выйти
				</Button>
			</div>
		</header>
	) : (
		<header className="flex w-full justify-end md:justify-between items-center absolute top-0 right-0 p-6">
			<img
				onClick={() => navigate("/")}
				src="/logo.png"
				alt="logo"
				className="w-fit h-12 hidden md:block cursor-pointer"
			/>{" "}
			<div className="flex items-center space-x-4">
				<Button
					onClick={() => setLoginModal(v => !v)}
					icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
				>
					Войти
				</Button>
			</div>
			<LoginModal
				isVisible={loginModal}
				setIsVisible={setLoginModal}
				openRegister={setRegisterModal}
			/>
			<RegisterModal
				isVisible={registerModal}
				setIsVisible={setRegisterModal}
				openLogin={setLoginModal}
			/>
		</header>
	)
}
