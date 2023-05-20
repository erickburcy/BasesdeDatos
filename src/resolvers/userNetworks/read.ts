import { iContext } from "index"
import { iFieldSelection } from "../../utils/getFields"
import { getFields } from "../../utils/getFields"

import { iUser, iUserNetworks } from "types"
import { readUser } from "../user/read"
import { readNetworks }  from "../networks/read"


export const readUserNetworks = async (
	parent: any,
	args: { id: number; nest: iFieldSelection },
	{ db }: iContext,
	info: any
): Promise<iUserNetworks[]> => {
	// Obtain the basic fields that are to be queried
	const fields = args.nest ? args.nest : getFields(info, "readUserNetworks")

	// Obtain the fields from the related tables
	const userFields = fields.include.find((user) => user.name === "user")
	const networksFields = fields.include.find(
		(networks) => networks.name === "networks"
	)
	// Query the fk so that we can match later
	if (userFields) fields.attributes.push("fkUser")
	if (networksFields) fields.attributes.push("fkNetworks")

	// (obtains just the basic fields)
	const searchedId = args.id ? { id: args.id } : undefined
	let found = (await db.sequelize.models.Post.findAll({
		where: searchedId,
		attributes: fields.attributes
	})) as any[]

	// (adds the related fields)
	if (networksFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				const related = await readNetworks(
					this,
					{ id: entry.fkNetworks, nest: networksFields },
					{ db },
					info
				)
				// read functions return an array
				entry.networks = related[0]

				return entry
			})
		)
	}
	if (userFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				const related = await readUser(
					this,
					{ id: entry.fkUser, nest: userFields },
					{ db },
					info
				)
				entry.user = related[0]

				return entry
			})
		)
	}

	return found
}
