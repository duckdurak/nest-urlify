type Props = {
	children: React.ReactNode
}

export const Body: React.FC<Props> = ({ children }) => {
	return (
		<div className="w-full min-h-screen h-screen flex flex-col items-center relative">
			{children}
		</div>
	)
}
