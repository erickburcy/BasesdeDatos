import { createCiclo, deleteCiclo,readCiclo,updateCiclo } from "./ciclo"
import { createClient, deleteClient, readClient, updateClient }from "./client"
import {
	createPost,
	deletePost,
	readPost,
	updatePost
} from "./post"
import {
	createNetworks,
	deleteNetworks,
	readNetworks,
	updateNetworks
} from "./networks"
import { createTier, deleteTier, readTier, updateTier } from "./tier"
import { createUser, deleteUser, readUser, updateUser } from "./user"
import { createUserNetworks,deleteUserNetworks,readUserNetworks,updateUserNetworks } from "./userNetworks"
import { createLocation,deleteLocation,readLocation,updateLocation
 } from "./location"
export const resolvers = {
	Query: {
		readCiclo,
		readClient,
		readPost,
		readNetworks,
		readTier,
		readUser,
		readUserNetworks,
		readLocation
	},

	Mutation: {
		createCiclo,
		deleteCiclo,
		updateCiclo,

		createClient,
		deleteClient,
		updateClient,

		createPost,
		deletePost,
		updatePost,

		createNetworks,
		deleteNetworks,
		updateNetworks,

		createTier,
		deleteTier,
		updateTier,
		
		createUser,
		deleteUser,
		updateUser,

		createUserNetworks,
		deleteUserNetworks,
		updateUserNetworks,

		createLocation,
		deleteLocation,
		updateLocation


	}
}
