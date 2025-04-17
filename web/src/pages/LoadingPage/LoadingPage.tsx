import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {}

export const LoadingPage: React.FC<Props> = () => {
	return (
		<div className="flex w-full min-h-screen h-screen justify-center items-center">
			<FontAwesomeIcon className="w-8 h-8 animate-spin" icon={faSpinner} />
		</div>
	)
}
