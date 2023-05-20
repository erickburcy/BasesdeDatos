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
import { iPost } from "types";
import Networks from "./networks";
import Client from "./client";

@Table({ tableName: "post", timestamps: false })
export default class Post extends Model<iPost> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => Networks)
	@Column({ field: "fkNetworks" })
	fkNetworks: number

	@HasOne(() => Networks, { foreignKey: "id", sourceKey: "fkNetworks" })
	networks: Networks

    @ForeignKey(() => Client)
	@Column({ field: "fkClient" })
	fkClient: number

	@HasOne(() => Client, { foreignKey: "id", sourceKey: "fkClient" })
    client: Client

    @Column({ type: DataType.STRING, allowNull: false })
	postdata: string
}
