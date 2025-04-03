import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { User } from "@user/entities/user.entity"
import { CustomRequest } from "src/types"

export const UserContext = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): User | null => {
		const request: CustomRequest = ctx.switchToHttp().getRequest()
		return request.user
	}
)
