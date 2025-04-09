import { FormProvider, useForm } from "react-hook-form"
import { BACKEND_API } from "../../axios"
import { TResponse } from "../../types"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"

type Props = {}

type TForm = {
	old_password: string
	new_password: string
}

export const ChangePasswordForm: React.FC<Props> = ({}) => {
	const form = useForm<TForm>()

	const onSubmit = async (values: TForm) => {
		const response = (await BACKEND_API.post("/api/user/password", values).then(
			res => {
				return res.data
			},
			res => {
				return res.response?.data
			}
		)) as TResponse<null>

		if (response.statusCode === 200) {
			form.reset()
		} else {
			form.resetField("new_password")
			alert(response.error)
		}
	}

	return (
		<FormProvider {...form}>
			<div className="w-full max-w-[50%] m-auto">
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col space-y-4"
				>
					<Input
						name="old_password"
						placeholder="Старый пароль"
						type="password"
					/>
					<Input
						name="new_password"
						placeholder="Новый пароль"
						type="password"
					/>
					<Button>Сохранить</Button>
				</form>
			</div>
		</FormProvider>
	)
}
