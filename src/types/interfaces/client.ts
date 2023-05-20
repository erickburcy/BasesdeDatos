import { iTier } from ".."
import { iCiclo } from ".."

export interface iClient {
	id: number
	username: string
    passwordHash: string
    membershipNumber: string
    email: string
    phone: string
    tier: iTier
    ciclo: iCiclo
}
