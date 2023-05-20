import { iClient } from ".."
import { iNetworks } from ".."

export interface iPost {
	id: number
	postdata: string
    client: iClient
    networks: iNetworks
}