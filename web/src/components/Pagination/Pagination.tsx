import { UnknownAction } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { usePagination } from "../../hooks/useNavigate"

type Props = {
	totalCount: number
	pageSize: number
	siblingCount: number
	currentPage: number
	onChange(page: number): UnknownAction
}

export const Pagination: React.FC<Props> = ({
	totalCount,
	pageSize,
	siblingCount,
	currentPage,
	onChange,
}) => {
	const dispatch = useAppDispatch()

	const pages = usePagination({
		totalCount: totalCount,
		pageSize: pageSize,
		siblingCount: siblingCount,
		currentPage: currentPage,
	})

	return (
		<div className="flex w-full justify-center items-center space-x-4 p-2 bg-black-rgba-low border-t border-black">
			{pages &&
				pages.map((page, key) =>
					page === "..." ? (
						<div className="cursor-none" key={key}>
							{page}
						</div>
					) : (
						<div
							className={page === currentPage ? "" : "cursor-pointer"}
							onClick={() =>
								page === currentPage ? {} : dispatch(onChange(page as number))
							}
							key={key}
						>
							{page}
						</div>
					)
				)}
		</div>
	)
}
