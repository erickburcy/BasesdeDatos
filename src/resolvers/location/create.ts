import { iContext } from "index"
import {iLocation } from "types"

export const createLocation = async (
	parent: any,
	args: {
		input: {
			place: string
		}
	},
	{ db }: iContext,
	info: any
) => {
	const created: iLocation = (await db.sequelize.models.Location.create({
		place: args.input.place
	})) as any

	return created
}
