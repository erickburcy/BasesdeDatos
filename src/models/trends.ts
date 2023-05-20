import {
	Column,
	AutoIncrement,
	PrimaryKey,
	Model,
	Table,
	DataType
} from "sequelize-typescript"
import { iTrends } from "types"

@Table({ tableName: "trends", timestamps: false })
export default class Trends extends Model<iTrends> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	word: string

	@Column({ type: DataType.NUMBER, allowNull: false })
	value: number
}