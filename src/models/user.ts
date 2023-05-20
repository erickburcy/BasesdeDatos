import {
	Column,
	DataType,
	PrimaryKey,
	AutoIncrement,
	Model,
	Table,
	ForeignKey,
	HasOne
} from "sequelize-typescript"
import { iUser } from "types"
import Location from "./location"

@Table({ tableName: "user", timestamps: false })
export default class User extends Model<iUser> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	username: string

	@ForeignKey(() => Location)
	@Column({ field: "fkLocation" })
	fkLocation: number

	@HasOne(() => Location, { foreignKey: "id", sourceKey: "fkLocation" })
	location : Location
}
