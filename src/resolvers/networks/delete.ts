import { iContext } from "index"

export const deleteNetworks = async (
	parent: any,
	args: { id: number },
	{ db }: iContext,
	info: any
) => {
	const toDelete = await db.sequelize.models.Networks.findByPk(args.id)

	if (!toDelete) {
		throw new Error(`No entry with the id ${args.id} could be found`)
	} else {
		return toDelete.destroy()
	}
}
