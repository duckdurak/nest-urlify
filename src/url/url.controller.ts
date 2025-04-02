import { AuthGuard } from "@auth/auth.guard"
import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Res,
	UseGuards,
} from "@nestjs/common"
import { IsAliasValidationPipe } from "@pipes/ParamPipes"
import { Response } from "express"
import { CreateUrlDto } from "./dto/createUrl.dto"
import { UrlService } from "./url.service"

@Controller("url")
export class UrlController {
	constructor(private readonly urlService: UrlService) {}

	@Post()
	async createUrl(@Body() createUrlDto: CreateUrlDto, @Res() res: Response) {
		const urlObject = await this.urlService.createUrl(createUrlDto)

		return res.status(200).json({
			message: urlObject,
			error: "No Error",
			statusCode: 200,
		})
	}

	@UseGuards(AuthGuard)
	@Get("test")
	test() {
		return "CORRECT"
	}

	@Get(":alias")
	async findOneUrl(
		@Param("alias", IsAliasValidationPipe) alias: string,
		@Res() res: Response
	) {
		const urlObject = await this.urlService.findOneByAlias(alias)

		if (!urlObject) {
			return res.status(404).json({
				message: "URL wasn't found",
				error: "Not Found",
				statusCode: 404,
			})
		}

		return res.status(200).json({
			message: urlObject,
			error: "No Error",
			statusCode: 200,
		})
	}
}
