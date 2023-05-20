import { iPost } from "..";
import { iTrends } from "..";

export interface iPostTrends {
	id: number
    post: iPost
    trends: iTrends
}