import { iContext } from "index"
import { iFieldSelection } from "../../utils/getFields"
import { getFields } from "../../utils/getFields"

import { iClient} from "types"
import { readTier } from "../tier/read"
import { readCiclo } from "../ciclo/read"

export const readClient = async (
	parent: any,
	args: { id: number; nest: iFieldSelection },
	{ db }: iContext,
	info: any
): Promise<iClient[]> => {
	const fields = args.nest ? args.nest : getFields(info, "readClient")

	const tierFields = fields.include.find((tier) => tier.name=== "tier")
	if (tierFields) fields.attributes.push("fkTier")
	
	const cicloFields = fields.include.find((ciclo)=> ciclo.name=== "ciclo")
	if(cicloFields) fields.attributes.push("fkCiclo")

	const searchedId = args.id ? { id: args.id } : undefined
	let found = (await db.sequelize.models.Client.findAll({
		where: searchedId,
		attributes: fields.attributes
	})) as any[]

	if (cicloFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				const related = await readTier(
					this,
					{ id: entry.fkCiclo, nest: cicloFields },
					{ db },
					info
				)
				entry.ciclo = related[0]

				return entry
			})
		)
	}

	if (tierFields) {
		found = await Promise.all(
			found.map(async (entry) => {
				const related = await readTier(
					this,
					{ id: entry.fkTier, nest: tierFields },
					{ db },
					info
				)
				entry.tier = related[0]

				return entry
			})
		)
	}

	return found
}
