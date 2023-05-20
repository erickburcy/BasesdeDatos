import { iContext } from "index"
import { iNetworks } from "types"

export const createNetworks = async (
	parent: any,
	args: {
		input: {
			networkname: string
		}
	},
	{ db }: iContext,
	info: any
) => {
	const created: iNetworks= (await db.sequelize.models.Networks.create({
		networkname: args.input.networkname,
	})) as any

	return created
}
