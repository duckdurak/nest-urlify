import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common"

@Injectable()
export class IsAliasValidationPipe implements PipeTransform {
	async transform(value: string) {
		if (value.length !== 6 || /[A-Z]/g.test(value)) {
			throw new BadRequestException(
				"alias must be 6 characters string with no uppercase"
			)
		}
		return value
	}
}
