import { string } from "zod";
import { Travel } from "./type";

export type WithChildren<T = {}> = T & { children?: React.ReactNode };
export interface TravelGateway {
    fetchTravels(url:string,id?:number): Promise<Travel[]>;
}