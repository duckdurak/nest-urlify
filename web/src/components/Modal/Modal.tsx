import { useEffect, useRef } from "react"
import { FormProvider } from "react-hook-form"

type Props = {
	form: any
	children: React.ReactNode
	onSubmit(): void
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal: React.FC<Props> = ({
	form,
	children,
	onSubmit,
	setIsVisible,
}) => {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setIsVisible(v => !v)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [setIsVisible])

	return (
		<FormProvider {...form}>
			<form
				onSubmit={onSubmit}
				className="flex justify-center items-center fixed top-0 left-0 w-full h-full z-10 bg-black-rgba"
			>
				<div
					ref={modalRef}
					className="flex flex-col space-y-4 border border-black relative bg-white w-[90%] max-w-[400px] rounded-2xl p-6 "
				>
					{children}
				</div>
			</form>
		</FormProvider>
	)
}
