import { ConfigurationModule } from "@config/config.module"
import { postgresConnectionOptions } from "@database/database.config"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [
		ConfigurationModule,
		TypeOrmModule.forRoot(postgresConnectionOptions),
	],
})
export class DatabaseModule {}
