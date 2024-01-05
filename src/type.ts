export type Travel = {
    id: number;
    status: string | null;
    name: string;
    userId: number;
    userFullName: string;
    tripType: boolean; // true for Round Trip, false for One Way
    departureCity: string;
    arrivalCity: string;
    departureDate: Date;
    returnDate: Date | null;
    costOriginal: number | null;
    originalCurrency: string | null;
    costUSD: number | null;
    bookingReferenceDocument: string | null;
    notes: string | null;
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
  export type TravelData = {
    id: number;
    name: string;
    status: string | null;
    userId: number;
    tripType: boolean | null; // Assuming boolean, but adjust as needed
    departureDateLeg1: Date;
    departureCityLeg1: string;
    arrivalCityLeg1: string;
    arrivalDateLeg1: Date | null;
    returnDepartureDateLeg2: Date | null;
    returnDepartureCityLeg2: string | null;
    returnArrivalCityLeg2: string | null;
    costOriginal: number | null;
    originalCurrency: string | null;
    costUSD: number | null;
    bookingReferenceDocument: string | null;
    notes: string | null;
    pdfLink: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        role: string;
        password: string; // Consider security implications of storing passwords in frontend models
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
    userFullName: string; // Optional, can be derived from user.firstName and user.lastName
};
export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
} | null;