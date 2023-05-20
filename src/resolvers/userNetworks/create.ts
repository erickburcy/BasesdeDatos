import { iContext } from "index"
import { iUserNetworks } from "types"

export const createUserNetworks = async (
	parent: any,
	args: {
		input: {
			fkUser: number
    		fkNetworks: number
		}
	},
	{ db }: iContext,
	info: any
) => {
	const created: iUserNetworks = (await db.sequelize.models.UserNetworks.create({
		fkUser: args.input.fkUser,
		fkNetworks: args.input.fkNetworks
	})) as any

	return created
}
