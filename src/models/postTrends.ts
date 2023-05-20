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
import { iPostTrends } from "types";
import Trends from "./trends";
import Post from "./post";
@Table({ tableName: "postTrends", timestamps: false })
export default class PostTrends extends Model<iPostTrends> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => Post)
	@Column({ field: "fkPost" })
	fkPost: number

	@HasOne(() => Post, { foreignKey: "id", sourceKey: "fkPost" })
	post: Post

    @ForeignKey(() => Trends)
	@Column({ field: "fkTrends" })
	fkTrends: number

	@HasOne(() => Trends, { foreignKey: "id", sourceKey: "fkTrends" })
    trends: Trends
}
