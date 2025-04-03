import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateByUsername } from "./dto/createBy.dto"
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
}
