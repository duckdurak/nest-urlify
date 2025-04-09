import { useForm } from "react-hook-form"
import { BACKEND_API } from "../../axios"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { loginUser } from "../../store/slices/user.slice"
import { TResponse, TSignInResponse } from "../../types"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import { Modal } from "../Modal/Modal"
import { ModalHeader } from "../Modal/ModalHeader"

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
	const dispatch = useAppDispatch()
	const form = useForm<TForm>()

	const onSubmit = async (values: TForm) => {
		const response = (await BACKEND_API.post("/api/auth/login", values).then(
			res => {
				return res.data
			},
			res => {
				return res.response?.data
			}
		)) as TResponse<TSignInResponse>

		if (response.statusCode === 200) {
			form.reset()
			window.localStorage.setItem("access_token", response.message.access_token)
			dispatch(loginUser(response.message.user))
		} else {
			form.resetField("password")
			alert(response.error)
		}
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
			<Input name="username" placeholder="Логин" type="text" />
			<Input name="password" placeholder="Пароль" type="password" />
			<div className="flex justify-end items-center">
				<p
					onClick={openRegisterModal}
					className="w-fit text-sm cursor-pointer hover:text-blue-500"
				>
					Регистрация
				</p>
			</div>
			<Button disabled={form.formState.isSubmitting}>Войти</Button>
		</Modal>
	)
}
