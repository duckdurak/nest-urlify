import { Body } from "../../components/Body/Body"
import { Header } from "../../components/Header/Header"

export const NotFoundPage: React.FC = () => {
	return (
		<Body>
			<Header />
			<div className="flex w-full h-full justify-center items-center">
				<h1 className="text-4xl">Страница не найдена!</h1>
			</div>
		</Body>
	)
}
