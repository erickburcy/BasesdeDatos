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
import { iClient} from "types";
import Tier from "./tier";
import Ciclo from "./ciclo";

@Table({ tableName: "client", timestamps: false })
export default class Client extends Model<iClient> {
	@AutoIncrement
	@PrimaryKey
	@Column({ type: DataType.NUMBER, allowNull: false })
	id: number

    @Column({ type: DataType.STRING, allowNull: false })
	username: string

    @Column({ type: DataType.STRING, allowNull: false })
	passwordHash: string

    @Column({ type: DataType.STRING, allowNull: false })
	membershipNumber: string

    @Column({ type: DataType.STRING, allowNull: false })
	email: string

    @Column({ type: DataType.STRING, allowNull: false })
	phone: string

	@ForeignKey(() => Tier)
	@Column({ field: "fkTier" })
	fkTier: number

	@HasOne(() => Tier, { foreignKey: "id", sourceKey: "fkTier" })
	tier: Tier

	@ForeignKey(() => Ciclo)
	@Column({ field: "fkCiclo" })
	fkCiclo: number

	@HasOne(() => Ciclo, { foreignKey: "id", sourceKey: "fkCiclo" })
	ciclo: Ciclo
}
