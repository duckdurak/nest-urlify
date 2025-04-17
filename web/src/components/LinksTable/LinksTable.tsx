import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { BACKEND_API } from "../../axios"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import {
	deleteUrlFromSlice,
	getUrls,
	setPageUrl,
} from "../../store/slices/links.slice"
import { TResponse, TUrl } from "../../types"
import { ChangeExpiryDateModal } from "../ChangeExpiryDateModal/ChangeExpiryDateModal"
import { Pagination } from "../Pagination/Pagination"

type Props = {}

export const LinksTable: React.FC<Props> = () => {
	const dispatch = useAppDispatch()

	const [changeExpiry, setChangeExpiry] = useState(false)
	const [url, setUrl] = useState({} as TUrl)
	const urls = useAppSelector(state => state.urls.urls)
	const isLoading = useAppSelector(state => state.urls.isLoading)
	const currentPage = useAppSelector(state => state.urls.currentPage)
	const totalCount = useAppSelector(state => state.urls.totalCount)
	const perPage = useAppSelector(state => state.urls.perPage)

	useEffect(() => {
		dispatch(getUrls({ page: currentPage, perPage: perPage }))
	}, [currentPage])

	const deleteUrl = async (alias: string) => {
		const response = (await BACKEND_API.delete("/api/url/" + alias).then(
			res => {
				return res.data
			},
			res => {
				return res.response?.data
			}
		)) as TResponse<null>

		if (response.statusCode === 200) {
			dispatch(deleteUrlFromSlice(alias))
		} else {
			alert(response.message)
		}
	}

	const openChangeExpiryModal = (url: TUrl) => {
		setUrl(url)
		setChangeExpiry(v => !v)
	}

	return (
		<div className="w-full overflow-x-auto">
			<ChangeExpiryDateModal
				url={url}
				isVisible={changeExpiry}
				setIsVisible={setChangeExpiry}
			/>
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
								<th
									onClick={() =>
										navigator.clipboard.writeText(
											`${document.location.protocol}//${document.location.host}/${url.alias}`
										)
									}
									className="p-3 font-normal"
								>
									<p className="cursor-pointer hover:text-blue-500">
										Скопировать
									</p>
								</th>
								<th className="p-3 font-normal">{url.url}</th>
								<th className="p-3 font-normal">{url.clicks}</th>
								<th className="p-3 font-normal">
									{new Date(url.created_at).toDateString()}
								</th>
								<th className="p-3 font-normal">
									{new Date(url.expiry_at).toDateString()}
								</th>
								<th className="p-3 font-normal">
									<FontAwesomeIcon
										className="text-blue-500 cursor-pointer"
										icon={faEdit}
										onClick={() => openChangeExpiryModal(url)}
									/>
									<FontAwesomeIcon
										className="ml-2 text-red-500 cursor-pointer"
										icon={faRemove}
										onClick={() => deleteUrl(url.alias)}
									/>
								</th>
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
					onChange={setPageUrl}
				/>
			)}
		</div>
	)
}
