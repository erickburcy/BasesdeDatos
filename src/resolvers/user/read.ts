import { iContext } from "index"
import { iFieldSelection } from "../../utils/getFields"
import { getFields } from "../../utils/getFields"

import { iUser } from "types"
import { readLocation } from "../location/read"


export const readUser = async (
	parent: any,
	args: { id: number; nest: iFieldSelection },
	{ db }: iContext,
	info: any
): Promise<iUser[]> => {
	// Obtain the basic fields that are to be queried
	const fields = args.nest ? args.nest : getFields(info, "readUser")

	// Obtain the fields from the related tables
	const locationFields = fields.include.find((location) => location.name === "location")
	
	// Query the fk so that we can match later
	if (locationFields) fields.attributes.push("fkLocation")

	// (obtains just the basic fields)
	const searchedId = args.id ? { id: args.id } : undefined
	let found = (await db.sequelize.models.User.findAll({
		where: searchedId,
		attributes: fields.attributes
	})) as any[]

	// (adds the related fields)
	if (locationFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				const related = await readLocation(
					this,
					{ id: entry.fkLocation, nest: locationFields },
					{ db },
					info
				)
				// read functions return an array
				entry.location = related[0]

				return entry
			})
		)
	}
	
	return found
}
