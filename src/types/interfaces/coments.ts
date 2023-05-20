import { iClient } from ".."
import { iNetworks } from ".."

export interface iComents {
	id: number
    dateTime: string
    feeling: number
    comentData: string
    client: iClient
    networks: iNetworks
}