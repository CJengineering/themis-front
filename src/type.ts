export type Travel = {
    id: number;
    name: string;
    userId: number;
    tripType: string;
    departureDateLeg1: Date;
    departureCityLeg1: string;
    arrivalCityLeg1: string;
    arrivalDateLeg1: Date;
    returnDepartureDateLeg2: Date;
    returnDepartureCityLeg2: string;
    returnArrivalCityLeg2: string;
    costOriginal: number;
    originalCurrency: string;
    costUSD: number;
    bookingReferenceDocument: string;
    notes?: string; // nullable
 
  };
  export type Accommodation = {
    id: number;
    name: string;
    status: string;
    travelerUserId: string;
    relatedTripTravelId: string;
    city: string;
    checkInDate: Date;
    checkOutDate: Date;
    totalCost: number;
    bookingConfirmationDocument: string;

  };