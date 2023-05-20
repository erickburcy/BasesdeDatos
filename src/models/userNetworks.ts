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
import { iUserNetworks } from "types";
import User from "./user";
import Networks from "./networks";
@Table({ tableName: "userNetworks", timestamps: false })
export default class UserNetworks extends Model<iUserNetworks> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => User)
	@Column({ field: "fkUser" })
	fkUser: number

	@HasOne(() => User, { foreignKey: "id", sourceKey: "fkUser" })
	user: User

    @ForeignKey(() => Networks)
	@Column({ field: "fkNetworks" })
	fkNetworks: number

	@HasOne(() => Networks, { foreignKey: "id", sourceKey: "fkNetworks" })
    networks: Networks
}
