import { useForm } from "react-hook-form"
import { BACKEND_API } from "../../axios"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { loginUser } from "../../store/slices/user.slice"
import { TResponse, TSignUpResponse } from "../../types"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import { Modal } from "../Modal/Modal"
import { ModalHeader } from "../Modal/ModalHeader"

type Props = {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	openLogin: React.Dispatch<React.SetStateAction<boolean>>
}

type TForm = {
	username: string
	password: string
	retry_password?: string
}

export const RegisterModal: React.FC<Props> = ({
	isVisible,
	setIsVisible,
	openLogin,
}) => {
	const dispatch = useAppDispatch()
	const form = useForm<TForm>()

	const onSubmit = async (values: TForm) => {
		if (values.password !== values.retry_password) {
			form.resetField("retry_password")
			alert("Пароли должны совпадать!")
			return
		}

		delete values.retry_password
		const response = (await BACKEND_API.post("/api/auth/register", values).then(
			res => {
				return res.data
			},
			res => {
				return res.response?.data
			}
		)) as TResponse<TSignUpResponse>

		if (response.statusCode === 200) {
			form.reset()
			window.localStorage.setItem("access_token", response.message.access_token)
			dispatch(loginUser(response.message.user))
		} else {
			alert(response.error)
		}
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
			<Input name="username" placeholder="Логин" type="text" />
			<Input name="password" placeholder="Пароль" type="password" />
			<Input
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
