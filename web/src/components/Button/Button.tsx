type Props = {
	children: React.ReactNode
	icon?: React.ReactNode
}

export const Button: React.FC<Props> = ({ children, icon }) => {
	return (
		<div className="px-6 py-2 border rounded-full inline-flex justify-center items-center gap-2 text-md hover:text-white hover:bg-black transition-colors duration-300 cursor-pointer">
			{icon && icon}
			{children}
		</div>
	)
}
