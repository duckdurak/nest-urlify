import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
	title: string
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalHeader: React.FC<Props> = ({ title, setIsVisible }) => {
	return (
		<div className="flex justify-between items-center text-lg">
			<p>{title}</p>
			<FontAwesomeIcon
				icon={faClose}
				className="cursor-pointer"
				onClick={() => setIsVisible(v => !v)}
			/>
		</div>
	)
}
