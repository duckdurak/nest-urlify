import { IndexPage } from "./IndexPage/IndexPage"
import { NotFoundPage } from "./NotFoundPage/NotFoundPage"
import { TRoute } from "./types"

export const routes: TRoute[] = [
	{
		path: "/",
		element: <IndexPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]
