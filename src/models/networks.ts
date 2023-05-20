import {
	Column,
	AutoIncrement,
	PrimaryKey,
	Model,
	Table,
	DataType
} from "sequelize-typescript"
import { iNetworks } from "types"

@Table({ tableName: "networks", timestamps: false })
export default class Networks extends Model<iNetworks> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	networkname: string
}