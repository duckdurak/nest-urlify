import { useForm } from "react-hook-form"
import { Button } from "../Button/Button"
import { Modal } from "../Modal/Modal"
import { ModalHeader } from "../Modal/ModalHeader"
import { ModalInput } from "../Modal/ModalInput"

type Props = {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	openRegister: React.Dispatch<React.SetStateAction<boolean>>
}

type TForm = {
	username: string
	password: string
}

export const LoginModal: React.FC<Props> = ({
	isVisible,
	setIsVisible,
	openRegister,
}) => {
	const form = useForm<TForm>()

	const onSubmit = (values: TForm) => {
		console.log(values)
	}

	const openRegisterModal = () => {
		setIsVisible(v => !v)
		openRegister(v => !v)
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
			<ModalHeader title="Авторизация" setIsVisible={setIsVisible} />
			<ModalInput name="username" placeholder="Логин" type="text" />
			<ModalInput name="password" placeholder="Пароль" type="password" />
			<div className="flex justify-end items-center">
				<p
					onClick={openRegisterModal}
					className="w-fit text-sm cursor-pointer hover:text-blue-500"
				>
					Регистрация
				</p>
			</div>
			<Button>Войти</Button>
		</Modal>
	)
}
