import { AuthModule } from "@auth/auth.module"
import { ConfigurationModule } from "@config/config.module"
import { DatabaseModule } from "@database/database.module"
import { JwtModule } from "@jwt/jwt.module"
import { RouteLoggerMiddleware } from "@middleware/route.logger"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { UrlModule } from "@url/url.module"
import { UserModule } from "@user/user.module"

@Module({
	imports: [
		ConfigurationModule,
		DatabaseModule,
		JwtModule,
		AuthModule,
		UserModule,
		UrlModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RouteLoggerMiddleware).forRoutes("/")
	}
}
