import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "@user/user.module"
import { Url } from "./entities/url.entity"
import { UrlController } from "./url.controller"
import { UrlService } from "./url.service"

@Module({
	imports: [TypeOrmModule.forFeature([Url]), UserModule],
	controllers: [UrlController],
	providers: [UrlService],
})
export class UrlModule {}
