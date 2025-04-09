import { Body } from "../../components/Body/Body"
import { ChangePasswordForm } from "../../components/ChangePasswordForm/ChangePasswordForm"
import { Header } from "../../components/Header/Header"
import { Navbar } from "../../components/Navbar/Navbar"

export const ProfilePage: React.FC = () => {
	return (
		<Body>
			<Header />
			<div className="flex w-full h-full justify-center items-center">
				<div className="flex flex-col space-y-6 w-[80%] max-w-[900px] shadow-box p-6 rounded-2xl">
					<p className="text-2xl text-center mb-2">Личный кабинет</p>
					<Navbar />
					<ChangePasswordForm />
				</div>
			</div>
		</Body>
	)
}
