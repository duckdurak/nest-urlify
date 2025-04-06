type Props = {
	children: React.ReactNode
}

export const ModalFooter: React.FC<Props> = ({ children }) => {
	return <div className="flex justify-end items-center text-lg">{children}</div>
}
