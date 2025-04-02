import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateByUsername } from "./dto/createBy.dto"
import { FindOneByIdDto, FindOneByUsernameDto } from "./dto/findOneBy.dto"
import { User } from "./entities/user.entity"

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async findOneById(dto: FindOneByIdDto): Promise<User | null> {
		const { id } = dto

		return this.usersRepository.findOneBy({ id: id })
	}

	async findOneByUsername(dto: FindOneByUsernameDto): Promise<User | null> {
		const { username } = dto

		return this.usersRepository.findOneBy({ username: username })
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
