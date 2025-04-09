import {
	faArrowRightToBracket,
	faSignOut,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { logout } from "../../store/slices/user.slice"
import { Button } from "../Button/Button"
import { LoginModal } from "../LoginModal/LoginModal"
import { RegisterModal } from "../RegisterModal/RegisterModal"

type Props = {}

export const Header: React.FC<Props> = () => {
	const dispatch = useAppDispatch()
	const [loginModal, setLoginModal] = useState(false)
	const [registerModal, setRegisterModal] = useState(false)

	const isAuth = useAppSelector(state => state.user.isAuth)
	const user = useAppSelector(state => state.user.user)

	return isAuth ? (
		<header className="flex items-center space-x-4 absolute top-0 right-0 p-6">
			<p className="text-lg">Привет, {user.username}!</p>
			<Button
				onClick={() => dispatch(logout())}
				icon={<FontAwesomeIcon icon={faSignOut} />}
			>
				Выйти
			</Button>
		</header>
	) : (
		<header className="absolute top-0 right-0 p-6">
			<Button
				onClick={() => setLoginModal(v => !v)}
				icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
			>
				Войти
			</Button>

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
