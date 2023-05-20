import { iContext } from "index"
import { iPost } from "types"

export const createPost = async (
	parent: any,
	args: {
		input: {
			fkClient: number
			fkNetworks: number
			postdata: string
		}
	},
	{ db }: iContext,
	info: any
) => {
	const created: iPost = (await db.sequelize.models.Post.create({
		fkClient: args.input.fkClient,
		fkNetworks: args.input.fkNetworks,
		postdata: args.input.postdata
	})) as any

	return created
}
