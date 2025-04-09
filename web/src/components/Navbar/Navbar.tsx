import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../routes"
import { Button } from "../Button/Button"

type Props = {}

export const Navbar: React.FC<Props> = () => {
	const navigate = useNavigate()

	useEffect(() => {}, [])

	return (
		<div className="flex justify-center space-x-6 pb-6 border-b border-black">
			{routes.map(
				(route, key) =>
					route.title !== "Страница не найдена" && (
						<Button
							onClick={() => navigate(route.path)}
							icon={route.icon}
							active={window.location.pathname === route.path}
							key={key}
						>
							{route.title}
						</Button>
					)
			)}
		</div>
	)
}
