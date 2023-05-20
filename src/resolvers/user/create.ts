import { iContext } from "index"
import { iUser } from "types"

export const createUser = async (
	parent: any,
	args: {
		input: {
			username: string
			fkLocation: number
		}
	},
	{ db }: iContext,
	info: any
) => {
	const created: iUser = (await db.sequelize.models.User.create({
		fkLocation: args.input.fkLocation,
		username: args.input.username
	})) as any

	return created
}
