import { Link, useNavigate } from "react-router-dom"
import { routes } from "../../routes"

type Props = {}

export const Navbar: React.FC<Props> = () => {
	const navigate = useNavigate()

	return (
		<div className="flex justify-center space-x-2 md:space-x-6 pb-6 border-b border-black">
			{routes.map(
				(route, key) =>
					route.title !== "Страница не найдена" && (
						<Link
							to={route.path}
							// icon={route.icon}
							// active={window.location.pathname === route.path}
							key={key}
							className={`px-2 py-0.5 md:px-6 md:py-2 border border-black rounded-full inline-flex text-center items-center gap-1 md:gap-2 text-xs md:text-base ${window.location.pathname === route.path ? "text-white bg-black" : "hover:text-white hover:bg-black"} transition-colors duration-300`}
						>
							{route.icon}
							{route.title}
						</Link>
					)
			)}
		</div>
	)
}
