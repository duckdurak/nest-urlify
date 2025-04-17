type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode
	icon?: React.ReactNode
	active?: boolean
	onClick?(): void
}

export const Button: React.FC<Props> = ({
	children,
	icon,
	active,
	onClick,
	...rest
}) => {
	return (
		<button
			onClick={onClick ? onClick : () => {}}
			className={`px-6 py-2 border border-black rounded-full inline-flex justify-center items-center gap-2 text-base ${active ? "text-white bg-black" : "hover:text-white hover:bg-black"} transition-colors duration-300`}
			{...rest}
		>
			{icon && icon}
			{children && children}
		</button>
	)
}
