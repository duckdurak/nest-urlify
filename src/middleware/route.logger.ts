import { Injectable, Logger, NestMiddleware } from "@nestjs/common"

import { NextFunction, Request, Response } from "express"

@Injectable()
export class RouteLoggerMiddleware implements NestMiddleware {
	private logger = new Logger("HTTP")

	use(request: Request, response: Response, next: NextFunction): void {
		const { method, path: url, body } = request

		response.on("close", () => {
			const { statusCode } = response

			this.logger.log(
				`[${method}] ${url} ${JSON.stringify(body)} ${statusCode}`
			)
		})

		next()
	}
}
