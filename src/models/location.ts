import {
	Column,
	AutoIncrement,
	PrimaryKey,
	Model,
	Table,
	DataType
} from "sequelize-typescript"
import { iLocation } from "types"

@Table({ tableName: "location", timestamps: false })
export default class Location extends Model<iLocation> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	place: string
}