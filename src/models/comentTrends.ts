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
import { iComentTrends } from "types";
import Trends from "./trends";
import Coments from "./coments";
@Table({ tableName: "comentTrends", timestamps: false })
export default class ComentTrends extends Model<iComentTrends> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => Coments)
	@Column({ field: "fkComents" })
	fkComents: number

	@HasOne(() => Coments, { foreignKey: "id", sourceKey: "fkComents" })
	coments: Coments

    @ForeignKey(() => Trends)
	@Column({ field: "fkTrends" })
	fkTrends: number

	@HasOne(() => Trends, { foreignKey: "id", sourceKey: "fkTrends" })
    trends: Trends
}
