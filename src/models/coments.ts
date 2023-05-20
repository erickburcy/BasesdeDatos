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
import { iComents } from "types";
import Post from "./post";
import User from "./user";
@Table({ tableName: "coments", timestamps: false })
export default class Coments extends Model<iComents> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

	@ForeignKey(() => Post)
	@Column({ field: "fkPost" })
	fkPost: number

	@HasOne(() => Post, { foreignKey: "id", sourceKey: "fkPost" })
	post: Post

    @ForeignKey(() => User)
	@Column({ field: "fkUser" })
	fkUser: number

	@HasOne(() => User, { foreignKey: "id", sourceKey: "fkUser" })
    user: User

    @Column({ type: DataType.STRING, allowNull: false })
	dateTime: string

    @Column({ type: DataType.NUMBER, allowNull: false })
	feeling: number

    @Column({ type: DataType.STRING, allowNull: false })
	comentData: string
}
