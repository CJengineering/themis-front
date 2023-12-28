export type Travel = {
    id: number;
    status: string;
    name: string;
    userId: number;
    userFullName: string;
    tripType: boolean;
    departureCity: string;
    arrivalCity: string;
    departureDate: Date;
    returnDate?: Date | null   ;
    costOriginal: number;
    originalCurrency: string;
    costUSD: number;
    bookingReferenceDocument: string;
    notes?: string|null ; // nullable
 
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