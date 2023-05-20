import { iUser } from ".."

export interface iInteractions {
	id: number
	reaction: string
    user: iUser
}