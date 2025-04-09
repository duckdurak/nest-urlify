import { FormProvider, useForm } from "react-hook-form"
import { BACKEND_API } from "../../axios"
import { useAppSelector } from "../../hooks/useAppSelector"
import { TResponse, TUrl } from "../../types"
import { Input } from "../Input/Input"

type TForm = {
	url: string
	expiry_at: string
}

export const UrlShortener: React.FC = () => {
	const form = useForm<TForm>()

	const onSubmit = async (values: TForm) => {
		const response = (await BACKEND_API.post("/api/url", values).then(
			res => {
				return res.data
			},
			res => {
				return res.response?.data
			}
		)) as TResponse<TUrl>

		if (response.statusCode === 200) {
			form.reset()
		} else {
			alert(response.error)
		}
	}

	const isLoggedIn = useAppSelector(state => state.user.isAuth)

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col flex-1 space-y-6 justify-center items-center"
			>
				<div className="flex flex-col space-y-4 w-full relative">
					<Input
						name="url"
						type="text"
						className="w-full px-6 py-2 border border-black rounded-full outline-none"
						title="Ссылка"
						placeholder="Введи свою ссылку..."
						button
					/>

					{isLoggedIn && (
						<Input
							name="expiry_at"
							type="datetime-local"
							title="Дата истечения"
							className=" w-fit px-6 py-2 border border-black rounded-full outline-none text-base"
						/>
					)}
				</div>
			</form>
		</FormProvider>
	)
}
