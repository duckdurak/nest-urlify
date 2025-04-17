import { AuthGuard, AuthGuardStrict } from "@auth/auth.guard"
import { UserContext } from "@decorators/UserContext.decorator"
import { CustomBadRequestException } from "@exceptions/BadRequest.exception"
import { CustomNotFoundException } from "@exceptions/NotFound.exception"
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Res,
	UseGuards,
} from "@nestjs/common"
import { IsAliasValidationPipe } from "@pipes/ParamPipes"
import { User } from "@user/entities/user.entity"
import { UserService } from "@user/user.service"
import { Response } from "express"
import { CreateUrlDto, CreateUrlWithAuthDto } from "./dto/create.dto"
import { UpdateUrlDto } from "./dto/update.dto"
import { UrlService } from "./url.service"

@Controller("url")
export class UrlController {
	constructor(
		private readonly urlService: UrlService,
		private readonly userService: UserService
	) {}

	@UseGuards(AuthGuard)
	@Post()
	async createUrl(
		@UserContext() userObject: User,
		@Body() dto: CreateUrlDto,
		@Res() res: Response
	) {
		const new_dto = userObject && new CreateUrlWithAuthDto(dto, userObject)

		const urlObject = await this.urlService.createUrl(new_dto ? new_dto : dto)
		delete urlObject.user

		return res.status(200).json({
			message: urlObject,
			error: "No Error",
			statusCode: 200,
		})
	}

	@UseGuards(AuthGuardStrict)
	@Get()
	async findUrlsOfUser(
		@UserContext() userObject: User,
		@Query("page") page: number,
		@Query("perPage") perPage: number,
		@Res() res: Response
	) {
		if (!page || !perPage) {
			throw new CustomBadRequestException(
				"You must supply current page and count per page!"
			)
		}
		const urlsObject = await this.urlService.findByPageOfUser(
			userObject.id,
			page,
			perPage
		)

		const totalCount = await this.urlService.getCountOfUser(userObject.id)

		for (const urlObject of urlsObject!) {
			delete urlObject.user
		}

		return res.status(200).json({
			message: {
				urls: urlsObject,
				totalCount,
				page,
				perPage,
			},
			error: "No Error",
			statusCode: 200,
		})
	}

	@Get(":alias")
	async findOneUrl(
		@Param("alias", IsAliasValidationPipe) alias: string,
		@Res() res: Response
	) {
		const urlObject = await this.urlService.findOneByAlias(alias)

		if (!urlObject || Date.now() >= new Date(urlObject.expiry_at).getTime()) {
			throw new CustomNotFoundException(
				"The requested url wasn't found on the server"
			)
		}

		const { url, expiry_at } = urlObject

		return res.status(200).json({
			message: { url, expiry_at },
			error: "No Error",
			statusCode: 200,
		})
	}

	@Delete(":alias")
	async findOneAndRemoveUrl(
		@Param("alias", IsAliasValidationPipe) alias: string,
		@Res() res: Response
	) {
		const isDeleted = await this.urlService.deleteByAlias(alias)

		if (!isDeleted) {
			throw new CustomNotFoundException(
				"The requested url wasn't found on the server"
			)
		}

		return res.status(200).json({
			message: null,
			error: "No Error",
			statusCode: 200,
		})
	}

	@Put(":alias")
	async findOneAndUpdateUrl(
		@Param("alias", IsAliasValidationPipe) alias: string,
		@Body() dto: UpdateUrlDto,
		@Res() res: Response
	) {
		const { expiry_at } = dto

		const urlObject = await this.urlService.findOneByAliasAndUpdate(
			alias,
			expiry_at
		)

		if (!urlObject) {
			throw new CustomNotFoundException(
				"The requested url wasn't found on the server"
			)
		}

		return res.status(200).json({
			message: urlObject,
			error: "No Error",
			statusCode: 200,
		})
	}
}
