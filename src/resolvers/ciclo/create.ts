import { iContext } from "index"
import { iCiclo } from "types"

export const createCiclo = async (
	parent: any,
	args: {
		input: {
			fkClient: number
		}
	},
	{ db }: iContext,
	info: any
) => {
	const created: iCiclo = (await db.sequelize.models.Ciclo.create({
		fkClient: args.input.fkClient,
	})) as any

	return created
}
