import { Travel } from "@/type";
import { RootState } from "./store";

export type PresentationTravel = {
    travels: Record<number, Travel>;
    ids: number[];
  };
export type TravelRows = {
    id: number,
    status: string
    name: string
    userId: number
    userFullName: string
    tripType: boolean // Assuming true represents 'Round Trip'
    departureCity: string,
    arrivalCity:string
    departureDate: Date 
    returnDate: Date | null
    costOriginal: number
    originalCurrency: string
    costUSD: number
    bookingReferenceDocument: string
    notes: string | null
}

export const createPrsentationTravel = (state: RootState): TravelRows[] => {
    const presentationTravel: TravelRows[] = [];
    const { ids, travels } = state.travel;

    ids.forEach((id) => {
        const travel = travels[id];
        if (!travel) return; // If the travel data is not found, skip this iteration

        const {
            status,
            name,
            userId,
            userFullName,
            tripType,
            departureCity,
            arrivalCity,
            departureDate,
            returnDate,
            costOriginal,
            originalCurrency,
            costUSD,
            bookingReferenceDocument,
            notes
        } = travel;

        presentationTravel.push({
            id,
            status,
            name,
            userId,
            userFullName,
            tripType,
            departureCity,
            arrivalCity,
            departureDate,
            returnDate: returnDate ?? null, 
            costOriginal,
            originalCurrency,
            costUSD,
            bookingReferenceDocument,
            notes: notes ?? null, 
        });
    });

    return presentationTravel;
};
