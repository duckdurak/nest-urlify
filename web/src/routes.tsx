import { faLink, faPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IndexPage } from "./pages/IndexPage/IndexPage"
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage"
import { LinksPage } from "./pages/Profile/LinksPage"
import { ProfilePage } from "./pages/Profile/ProfilePage"
import { ProtectedPage } from "./pages/ProtectedPage/ProtectedPage"
import { TRoute } from "./types"

export const routes: TRoute[] = [
	{
		path: "/",
		element: <IndexPage />,
		icon: <FontAwesomeIcon icon={faPlus} />,
		title: "Создание ссылки",
	},
	{
		path: "/profile",
		element: (
			<ProtectedPage>
				<ProfilePage />
			</ProtectedPage>
		),
		icon: <FontAwesomeIcon icon={faUser} />,
		title: "Личный кабинет",
	},
	{
		path: "/profile/links",
		element: (
			<ProtectedPage>
				<LinksPage />
			</ProtectedPage>
		),
		icon: <FontAwesomeIcon icon={faLink} />,
		title: "Ссылки",
	},
	{
		path: "*",
		element: <NotFoundPage />,
		icon: false,
		title: "Страница не найдена",
	},
]
