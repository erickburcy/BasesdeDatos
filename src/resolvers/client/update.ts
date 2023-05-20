import { iContext } from "index"

export const updateClient = async (
	parent: any,
	args: {
		id: number
		input: {
			username?: string
			passwordHash?: string
			membershipNumber?: string
			email?: string
			phone?: string
			fkTier?: number
			fkCiclo?: number
		}
	},
	{ db }: iContext,
	info: any
) => {
	const toUpdate = await db.sequelize.models.Client.findByPk(args.id)

	if (!toUpdate) {
		throw new Error(`No entry with the id ${args.id} could be found`)
	} else {
		return await toUpdate.update(args.input)
	}
}
