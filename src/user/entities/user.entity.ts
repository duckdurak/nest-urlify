import { Url } from "@url/entities/url.entity"
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column()
	username: string

	@Column()
	password: string

	@OneToMany(() => Url, url => url.user)
	urls: Url[]

	@CreateDateColumn()
	created_at: Date
}
