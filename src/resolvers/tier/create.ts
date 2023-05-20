import { iContext } from "index"
import { iTier } from "types"

export const createTier = async (
	parent: any,
	args: {
		input: {
			tierdata: string
		}
	},
	{ db }: iContext,
	info: any
) => {
	const created: iTier = (await db.sequelize.models.Tier.create({
		tierdata: args.input.tierdata,
	})) as any

	return created
}
