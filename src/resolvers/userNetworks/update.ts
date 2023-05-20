import { iContext } from "index"

export const updateUserNetworks = async (
	parent: any,
	args: {
		id: number
		input: {
			id?: number
			user?: number
			networks?: number
		}
	},
	{ db }: iContext,
	info: any
) => {
	const toUpdate = await db.sequelize.models.UserNetworks.findByPk(args.id)

	if (!toUpdate) {
		throw new Error(`No entry with the id ${args.id} could be found`)
	} else {
		return await toUpdate.update(args.input)
	}
}
