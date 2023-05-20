import { iContext } from "index"

export const updatePost = async (
	parent: any,
	args: {
		id: number
		input: {
			fkClient?: number
			fkNetworks?: number
			postdata?: string
		}
	},
	{ db }: iContext,
	info: any
) => {
	const toUpdate = await db.sequelize.models.Post.findByPk(args.id)

	if (!toUpdate) {
		throw new Error(`No entry with the id ${args.id} could be found`)
	} else {
		return await toUpdate.update(args.input)
	}
}
