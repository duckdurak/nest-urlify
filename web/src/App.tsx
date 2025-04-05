import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "./routes"

export const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map((route, key) => (
					<Route key={key} path={route.path} element={route.element}></Route>
				))}
			</Routes>
		</BrowserRouter>
	)
}

export default App
