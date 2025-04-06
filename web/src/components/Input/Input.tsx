import { forwardRef } from "react"
import { Controller, useFormContext } from "react-hook-form"

const ControlledInput = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
	return <input ref={ref} {...props} />
})

export const Input = ({
	name,
	...props
}: { name: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
	const { control } = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<ControlledInput {...field} value={field.value || ""} {...props} />
			)}
		/>
	)
}
