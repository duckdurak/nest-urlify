import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm"

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column()
	username: string

	// @Column()
	// email: string

	@Column()
	password: string

	@CreateDateColumn()
	created_at: Date
}
