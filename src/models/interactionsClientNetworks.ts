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
import { iInteractionsClientNetworks } from "types";
import Interactions from "./interactions";
import Post from "./post";
@Table({ tableName: "interactionsClientNetworks", timestamps: false })
export default class InteractionsClientNetworks extends Model<iInteractionsClientNetworks> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => Post)
	@Column({ field: "fkPost" })
	fkPost: number

	@HasOne(() => Post, { foreignKey: "id", sourceKey: "fkPost" })
	post: Post

    @ForeignKey(() => Interactions)
	@Column({ field: "fkInteractions" })
	fkInteractions: number

	@HasOne(() => Interactions, { foreignKey: "id", sourceKey: "fkInteractions" })
    interactions: Interactions
}
