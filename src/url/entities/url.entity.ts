import { User } from "@user/entities/user.entity"
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
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

	@Column({ default: 0 })
	clicks: number

	@ManyToOne(() => User, user => user.urls, { nullable: true })
	@JoinColumn({ name: "user_id" })
	user?: User | null

	@CreateDateColumn()
	created_at: Date

	@Column()
	expiry_at: Date
}
