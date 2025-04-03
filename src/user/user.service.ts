import { CustomUnauthorizedException } from "@exceptions/Unauthorized.exception"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { compare, genSalt, hash } from "bcrypt"
import { Repository } from "typeorm"
import { CreateByUsername } from "./dto/create.dto"
import { UpdatePasswordWithAuthDto } from "./dto/update.dto"
import { User } from "./entities/user.entity"

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async findOneById(id: string): Promise<User | null> {
		return id ? this.usersRepository.findOne({ where: { id: id } }) : null
	}

	async findOneByUsername(username: string): Promise<User | null> {
		return this.usersRepository.findOne({ where: { username: username } })
	}

	async createByUsername(dto: CreateByUsername) {
		const { username, hashedPassword } = dto

		const user = this.usersRepository.create({
			username: username,
			password: hashedPassword,
			created_at: new Date(),
		})

		await this.usersRepository.save(user)

		return user
	}

	async updatePassword(dto: UpdatePasswordWithAuthDto) {
		const { old_password, new_password, userObject } = dto

		if (!(await compare(old_password, userObject.password))) {
			throw new CustomUnauthorizedException(
				"Your password doesn't seem to be correct"
			)
		}

		const salt = await genSalt()
		const hashedPassword = await hash(new_password, salt)

		userObject.password = hashedPassword
		await this.usersRepository.save(userObject)
	}
}
