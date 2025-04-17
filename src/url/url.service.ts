import { CustomBadRequestException } from "@exceptions/BadRequest.exception"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateUrlDto, CreateUrlWithAuthDto } from "./dto/create.dto"
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

	public async createUrl(
		dto: CreateUrlDto | CreateUrlWithAuthDto
	): Promise<Url> {
		const alias = this.makeAlias(6)

		if (dto instanceof CreateUrlWithAuthDto) {
			const { url, expiry_at, user } = dto
			if (!expiry_at) {
				throw new CustomBadRequestException("You have to set expiry date")
			}

			const urlObject = this.urlsRepository.create({
				url,
				alias,
				expiry_at,
				user: user,
			})

			return await this.urlsRepository.save(urlObject)
		} else {
			const { url } = dto
			const expiry_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

			const urlObject = this.urlsRepository.create({
				url,
				alias,
				expiry_at,
			})

			return await this.urlsRepository.save(urlObject)
		}
	}

	public async deleteByAlias(alias: string): Promise<boolean> {
		if (alias) {
			const urlObject = await this.urlsRepository.findOne({
				where: { alias },
			})

			if (urlObject) {
				await this.urlsRepository.remove([urlObject], {})
				return true
			} else {
				return false
			}
		}

		return false
	}

	public async findOneByAlias(alias: string): Promise<Url | null> {
		if (alias) {
			const urlObject = await this.urlsRepository.findOne({ where: { alias } })

			if (!urlObject) {
				return null
			}

			urlObject.clicks += 1
			return await this.urlsRepository.save(urlObject)
		} else {
			return null
		}
	}

	public async getCountOfUser(user_id: string): Promise<number> {
		return user_id
			? await this.urlsRepository.count({
					relations: { user: true },
					where: { user: { id: user_id } },
				})
			: 0
	}

	public async findByPageOfUser(
		user_id: string,
		page: number,
		perPage: number
	): Promise<Url[] | null> {
		return user_id
			? await this.urlsRepository.find({
					relations: { user: true },
					where: { user: { id: user_id } },
					skip: (page - 1) * perPage,
					take: perPage,
					order: { created_at: "DESC" },
				})
			: null
	}

	public async findOneByAliasAndUpdate(
		alias: string,
		expiry_at: string
	): Promise<Url | null> {
		if (alias) {
			const urlObject = await this.urlsRepository.findOne({ where: { alias } })

			if (!urlObject) {
				return null
			}

			urlObject.expiry_at = new Date(expiry_at)

			return await this.urlsRepository.save(urlObject)
		} else {
			return null
		}
	}
}
