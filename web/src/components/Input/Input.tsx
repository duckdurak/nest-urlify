import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
import { Controller, useFormContext } from "react-hook-form"

const RefInput = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
	return <input ref={ref} {...props} />
})

const ControlledInput = ({
	name,
	...props
}: { name: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
	const { control } = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<RefInput {...field} value={field.value || ""} {...props} />
			)}
		/>
	)
}

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	title?: string
	name: string
	button?: boolean
}

export const Input: React.FC<Props> = ({ title, name, button, ...rest }) => {
	return (
		<div className="flex flex-col text-lg">
			{title && (
				<label className="text-md" htmlFor={name}>
					{title}
				</label>
			)}
			<div className="w-full relative">
				<ControlledInput
					className="w-full px-6 py-2 border border-black rounded-full outline-none"
					name={name}
					{...rest}
				/>

				{button && (
					<button className="absolute right-0 top-[50%] translate-y-[-50%] translate-x-[-10px] w-8 h-8 p-2 rounded-full inline-flex justify-center items-center hover:text-white hover:bg-black transition-colors duration-300 cursor-pointer">
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
				)}
			</div>
		</div>
	)
}
