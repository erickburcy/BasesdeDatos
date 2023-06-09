import { iContext } from "index"

export const updateCiclo = async (
	parent: any,
	args: {
		id: number
		input: {
			fkClient?: number
		}
	},
	{ db }: iContext,
	info: any
) => {
	const toUpdate = await db.sequelize.models.Ciclo.findByPk(args.id)

	if (!toUpdate) {
		throw new Error(`No entry with the id ${args.id} could be found`)
	} else {
		return await toUpdate.update(args.input)
	}
}
