import { ConfigurationModule } from "@config/config.module"
import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as jwt from "@nestjs/jwt"

const configService = new ConfigService()

@Module({
	imports: [
		ConfigurationModule,
		jwt.JwtModule.register({
			global: true,
			secret: configService.get<string>("JWT_SECRET"),
			signOptions: { expiresIn: "7d" },
		}),
	],
})
export class JwtModule {}
