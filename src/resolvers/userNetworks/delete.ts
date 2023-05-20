import { iContext } from "index"

export const deleteUserNetworks = async (
	parent: any,
	args: { id: number },
	{ db }: iContext,
	info: any
) => {
	const toDelete = await db.sequelize.models.UserNetworks.findByPk(args.id)

	if (!toDelete) {
		throw new Error(`No entry with the id ${args.id} could be found`)
	} else {
		return toDelete.destroy()
	}
}
