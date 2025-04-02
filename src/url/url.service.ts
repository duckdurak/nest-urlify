import { Injectable } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import { InjectRepository } from "@nestjs/typeorm"
import { LessThan, Repository } from "typeorm"
import { CreateUrlDto } from "./dto/createUrl.dto"
import { Url } from "./entities/url.entity"

@Injectable()
export class UrlService {
	constructor(
		@InjectRepository(Url)
		private readonly urlsRepository: Repository<Url>
	) {}

	private makeAlias(len: number) {
		let result = ""
		const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
		const charactersLength: number = characters.length
		let counter: number = 0
		while (counter < len) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
			counter += 1
		}
		return result
	}

	public async createUrl(dto: CreateUrlDto): Promise<Url> {
		const { url } = dto
		const alias = this.makeAlias(6)

		const urlObject = this.urlsRepository.create({ url, alias })

		return await this.urlsRepository.save(urlObject)
	}

	public async findOneByAlias(alias: string): Promise<Url | null> {
		return await this.urlsRepository.findOneBy({ alias })
	}

	@Cron("0 0 * * * *")
	private async findAllExpiredAndDelete() {
		const dayAgo = new Date(Date.now() - 1000 * 60 * 60 * 24)

		const urlObjects = await this.urlsRepository.find({
			where: { created_at: LessThan(dayAgo) },
		})

		await this.urlsRepository.remove(urlObjects)
	}
}
