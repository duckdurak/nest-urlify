import { Input } from "../Input/Input"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	title?: string
	name: string
}

export const ModalInput: React.FC<Props> = ({ title, name, ...rest }) => {
	return (
		<div className="flex flex-col text-lg">
			{title && <label>{title}</label>}
			<Input
				className="w-full px-6 py-2 border border-black rounded-full outline-none"
				name={name}
				{...rest}
			/>
		</div>
	)
}
