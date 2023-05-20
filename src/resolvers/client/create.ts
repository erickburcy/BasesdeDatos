import { iContext } from "index"
import { iClient } from "types"

export const createClient = async (
	parent: any,
	args: {
		input: {
			username: string
			passwordHash: string
			membershipNumber: string
			email: string
			phone: string
			fkTier: number
			fkCiclo: number
		}
	},
	{ db }: iContext,
	info: any
) => {
	const created: iClient = (await db.sequelize.models.Client.create({
		username: args.input.username,
		passwordHash: args.input.passwordHash,
		membershipNumber: args.input.membershipNumber,
		email: args.input.email,
		phone: args.input.phone,
		fkTier: args.input.fkTier,
		fkCiclo: args.input.fkCiclo
	})) as any

	return created
}
