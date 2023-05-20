import { iContext } from "index"
import { iFieldSelection } from "../../utils/getFields"
import { getFields } from "../../utils/getFields"

import { iCiclo } from "types"
import { readClient } from "../client/read"

export const readCiclo = async (
	parent: any,
	args: { id: number; nest: iFieldSelection },
	{ db }: iContext,
	info: any
): Promise<iCiclo[]> => {
	// Obtain the basic fields that are to be queried
	const fields = args.nest ? args.nest : getFields(info, "readCiclo")
	// Obtain the fields from the related tables
	const clientFields = fields.include.find((client) => client.name=== "client")
	if (clientFields) fields.attributes.push("fkClient")

	const searchedId = args.id ? { id: args.id } : undefined
	let found = (await db.sequelize.models.Ciclo.findAll({
		where: searchedId,
		attributes: fields.attributes
	})) as any[]

	if (clientFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				const related = await readClient(
					this,
					{ id: entry.fkTier, nest: clientFields },
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
