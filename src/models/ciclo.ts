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
import { iCiclo} from "types";
import Client from "./client";

@Table({ tableName: "ciclo", timestamps: false })
export default class Ciclo extends Model<iCiclo> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => Client)
	@Column({ field: "fkClient" })
	fkClient: number

	@HasOne(() => Client, { foreignKey: "id", sourceKey: "fkClient" })
	client: Client
}
