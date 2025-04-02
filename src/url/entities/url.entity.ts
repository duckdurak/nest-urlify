import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm"

@Entity({ name: "urls" })
export class Url {
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column()
	alias: string

	@Column()
	url: string

	@CreateDateColumn()
	created_at
}
