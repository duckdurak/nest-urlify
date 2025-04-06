import { useForm } from "react-hook-form"
import { Button } from "../Button/Button"
import { Modal } from "../Modal/Modal"
import { ModalHeader } from "../Modal/ModalHeader"
import { ModalInput } from "../Modal/ModalInput"

type Props = {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	openLogin: React.Dispatch<React.SetStateAction<boolean>>
}

type TForm = {
	username: string
	password: string
	retry_password: string
}

export const RegisterModal: React.FC<Props> = ({
	isVisible,
	setIsVisible,
	openLogin,
}) => {
	const form = useForm<TForm>()

	const onSubmit = (values: TForm) => {
		console.log(values)
	}

	const openLoginModal = () => {
		setIsVisible(v => !v)
		openLogin(v => !v)
	}

	if (!isVisible) {
		return null
	}

	return (
		<Modal
			form={form}
			onSubmit={form.handleSubmit(onSubmit)}
			setIsVisible={setIsVisible}
		>
			<ModalHeader title="Регистрация" setIsVisible={setIsVisible} />
			<ModalInput name="username" placeholder="Логин" type="text" />
			<ModalInput name="password" placeholder="Пароль" type="password" />
			<ModalInput
				name="retry_password"
				placeholder="Пароль повторно"
				type="password"
			/>
			<div className="flex justify-end items-center">
				<p
					onClick={openLoginModal}
					className="w-fit text-sm cursor-pointer hover:text-blue-500"
				>
					Авторизация
				</p>
			</div>
			<Button>Зарегистрироваться</Button>
		</Modal>
	)
}
