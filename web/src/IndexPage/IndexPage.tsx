import {
	faArrowRight,
	faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Body } from "../components/Body/Body"
import { Button } from "../components/Button/Button"
import { LoginModal } from "../components/LoginModal/LoginModal"
import { RegisterModal } from "../components/RegisterModal/RegisterModal"

export const IndexPage: React.FC = () => {
	const [loginModal, setLoginModal] = useState(false)
	const [registerModal, setRegisterModal] = useState(false)

	return (
		<Body>
			<header className="flex w-full justify-end items-center p-6">
				<Button
					onClick={() => setLoginModal(v => !v)}
					icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
				>
					Войти
				</Button>
			</header>

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

			<div className="flex flex-col flex-1 space-y-6 justify-center items-center w-[600px]">
				<h1 className="text-4xl">Сократи свою ссылку</h1>
				<div className="w-full relative">
					<input
						className="w-full px-6 py-2 border border-black rounded-full outline-none"
						placeholder="Введи свою ссылку..."
					/>
					<div className="absolute top-[50%] translate-y-[-50%] translate-x-[-40px] w-8 h-8 p-2 rounded-full inline-flex justify-center items-center hover:text-white hover:bg-black transition-colors duration-300 cursor-pointer">
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
				</div>
			</div>
		</Body>
	)
}
