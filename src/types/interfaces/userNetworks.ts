import { iUser } from "..";
import { iNetworks } from "..";

export interface iUserNetworks{
    id: number
    user: iUser
    networks: iNetworks
}