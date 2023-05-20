import { iContext } from "index"
import { getFields } from "../../utils/getFields"

export const readNetworks = async (
	parent: any,
	args: { id: number; nest: any },
	{ db }: iContext,
	info: any
) => {
	const searchedId = args.id ? { id: args.id } : undefined
	const fields = args.nest ? args.nest : getFields(info, "readNetworks")

	const found = await db.sequelize.models.Networks.findAll({
		where: searchedId,
		attributes: fields.attributes
	})

	return found
}
