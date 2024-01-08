import { string } from "zod";
import { Travel, TravelData } from "./type";

export type WithChildren<T = {}> = T & { children?: React.ReactNode };
export interface TravelGateway {
    fetchTravels(url:string,options: { id?: number, userId?: string ,userRole?:string}): Promise<TravelData[]>;
}

export interface CityData {
    city: string;
    
  }