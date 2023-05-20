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
import { iInteractions } from "types";
import User from "./user";

@Table({ tableName: "interactions", timestamps: false })
export default class Interactions extends Model<iInteractions> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => User)
	@Column({ field: "fkUser" })
	fkUser: number

	@HasOne(() => User, { foreignKey: "id", sourceKey: "fkUser" })
	user: User

    @Column({ type: DataType.STRING, allowNull: false })
	reaction: string
}
