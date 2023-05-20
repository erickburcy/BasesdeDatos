import { iContext } from "index"

export const updateNetworks = async (
	parent: any,
	args: {
		id: number
		input: {
			networkname?: string
		}
	},
	{ db }: iContext,
	info: any
) => {
	const toUpdate = await db.sequelize.models.Networks.findByPk(args.id)

	if (!toUpdate) {
		throw new Error(`No entry with the id ${args.id} could be found`)
	} else {
		return await toUpdate.update(args.input)
	}
}
