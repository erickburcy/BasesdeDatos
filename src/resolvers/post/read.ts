import { iContext } from "index"
import { iFieldSelection } from "../../utils/getFields"
import { getFields } from "../../utils/getFields"

import { iPost } from "types"
import { readNetworks }  from "../networks/read"
import { readClient } from "../client/read"


export const readPost = async (
	parent: any,
	args: { id: number; nest: iFieldSelection },
	{ db }: iContext,
	info: any
): Promise<iPost[]> => {
	// Obtain the basic fields that are to be queried
	const fields = args.nest ? args.nest : getFields(info, "readPost")

	// Obtain the fields from the related tables
	const clientFields = fields.include.find((client) => client.name === "client")
	const networksFields = fields.include.find(
		(networks) => networks.name === "networks"
	)
	// Query the fk so that we can match later
	if (clientFields) fields.attributes.push("fkClient")
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
	if (clientFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				const related = await readClient(
					this,
					{ id: entry.fkClient, nest: clientFields },
					{ db },
					info
				)
				entry.client = related[0]

				return entry
			})
		)
	}

	return found
}
