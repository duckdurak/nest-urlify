import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { BACKEND_API } from "../../axios"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { updateUrlFromSlice } from "../../store/slices/links.slice"
import { TResponse, TUrl } from "../../types"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import { Modal } from "../Modal/Modal"
import { ModalHeader } from "../Modal/ModalHeader"

type Props = {
	url: TUrl
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type TForm = {
	expiry_at: string
}

export const ChangeExpiryDateModal: React.FC<Props> = ({
	url,
	isVisible,
	setIsVisible,
}) => {
	const dispatch = useAppDispatch()
	const form = useForm<TForm>()

	const onSubmit = async (values: TForm) => {
		const response = (await BACKEND_API.put(
			"/api/url/" + url.alias,
			values
		).then(
			res => {
				return res.data
			},
			res => {
				return res.response?.data
			}
		)) as TResponse<TUrl>
		if (response.statusCode === 200) {
			setIsVisible(false)
			dispatch(
				updateUrlFromSlice({
					alias: response.message.alias,
					expiry_at: response.message.expiry_at,
				})
			)
		} else {
			form.setValue("expiry_at", url.expiry_at)
			alert(response.error)
		}
	}

	useEffect(() => {
		if (isVisible && url) {
			form.setValue(
				"expiry_at",
				new Date(url.expiry_at).toISOString().slice(0, 16)
			)
		}
	}, [isVisible, url])

	if (!isVisible) {
		return null
	}

	return (
		<Modal
			form={form}
			onSubmit={form.handleSubmit(onSubmit)}
			setIsVisible={setIsVisible}
		>
			<ModalHeader
				title="Изменение срока истечения"
				setIsVisible={setIsVisible}
			/>
			<Input
				name="expiry_at"
				placeholder="Дата истечения"
				type="datetime-local"
			/>
			<Button>Сохранить</Button>
		</Modal>
	)
}
