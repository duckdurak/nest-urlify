import { ConfigService } from "@nestjs/config"
import { config } from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"

config()

const configService = new ConfigService()

export const postgresConnectionOptions: DataSourceOptions = {
	type: "postgres",
	host: configService.get<string>("DATABASE_HOST"),
	port: configService.get<number>("DATABASE_PORT"),
	username: configService.get<string>("DATABASE_USERNAME"),
	password: configService.get<string>("DATABASE_PASSWORD"),
	database: configService.get<string>("DATABASE_NAME"),
	entities: ["dist/**/*.entity{.ts,.js}"],
	migrations: ["dist/database/migrations/*.js"],
}

const dataSource = new DataSource(postgresConnectionOptions)
export default dataSource
