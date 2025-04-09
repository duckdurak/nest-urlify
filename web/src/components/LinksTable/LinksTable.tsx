import { useEffect } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { getUrls, setPage } from "../../store/slices/links.slice"
import { Pagination } from "../Pagination/Pagination"

type Props = {}

export const LinksTable: React.FC<Props> = () => {
	const dispatch = useAppDispatch()

	// const isLoggedIn = useAppSelector(state => state.user.isAuth)
	const urls = useAppSelector(state => state.urls.urls)
	const isLoading = useAppSelector(state => state.urls.isLoading)
	const currentPage = useAppSelector(state => state.urls.currentPage)
	const totalCount = useAppSelector(state => state.urls.totalCount)
	const perPage = useAppSelector(state => state.urls.perPage)

	useEffect(() => {
		dispatch(getUrls({ page: currentPage, perPage: perPage }))
	}, [currentPage])

	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full border-collapse text-sm">
				<thead>
					<tr className="border-b border-black">
						<th className="p-3 bg-black-rgba-low">#</th>
						<th className="p-3 bg-black-rgba-low">Сокращенная ссылка</th>
						<th className="p-3 bg-black-rgba-low">Исходная ссылка</th>
						<th className="p-3 bg-black-rgba-low">Переходы</th>
						<th className="p-3 bg-black-rgba-low">Создано</th>
						<th className="p-3 bg-black-rgba-low">Истекает</th>
						<th className="p-3 bg-black-rgba-low">Действия</th>
					</tr>
				</thead>
				<tbody>
					{!isLoading &&
						urls.map((url, key) => (
							<tr key={key}>
								<th className="p-3 font-normal">{key + 1}</th>
								<th className="p-3 font-normal">Скопировать</th>
								<th className="p-3 font-normal">{url.url}</th>
								<th className="p-3 font-normal">{url.clicks}</th>
								<th className="p-3 font-normal">
									{new Date(url.created_at).toDateString()}
								</th>
								<th className="p-3 font-normal">
									{new Date(url.expiry_at).toDateString()}
								</th>
								<th className="p-3 font-normal"></th>
							</tr>
						))}
				</tbody>
			</table>
			{totalCount > perPage && (
				<Pagination
					totalCount={totalCount}
					pageSize={perPage}
					siblingCount={1}
					currentPage={currentPage}
					onChange={setPage}
				/>
			)}
		</div>
	)
}
