import { Accommodation, Travel } from "./type";

export const travels: Travel[] = [
    {
      id: 1,
      name: "Summer Vacation",
      userId: 123,
      tripType: "Round Trip",
      departureDateLeg1: new Date("2023-06-15"),
      departureCityLeg1: "New York",
      arrivalCityLeg1: "Paris",
      arrivalDateLeg1: new Date("2023-06-20"),
      returnDepartureDateLeg2: new Date("2023-07-05"),
      returnDepartureCityLeg2: "Paris",
      returnArrivalCityLeg2: "New York",
      costOriginal: 1200,
      originalCurrency: "EUR",
      costUSD: 1400,
      bookingReferenceDocument: "ABC123XYZ",
      notes: "This is going to be an amazing trip!",
    
    },
    {
      id: 2,
      name: "Business Trip",
      userId: 456,
      tripType: "One-Way",
      departureDateLeg1: new Date("2023-02-10"),
      departureCityLeg1: "Los Angeles",
      arrivalCityLeg1: "New York",
      arrivalDateLeg1: new Date("2023-02-10"),
      returnDepartureDateLeg2: new Date("2023-07-05"), 
      returnDepartureCityLeg2: "",
      returnArrivalCityLeg2: "",
      costOriginal: 500,
      originalCurrency: "USD",
      costUSD: 500,
      bookingReferenceDocument: "DEF789ABC",
     
    },
    {
      id: 3,
      name: "Weekend Getaway",
      userId: 789,
      tripType: "Round Trip",
      departureDateLeg1: new Date("2023-04-22"),
      departureCityLeg1: "Chicago",
      arrivalCityLeg1: "Las Vegas",
      arrivalDateLeg1: new Date("2023-04-22"),
      returnDepartureDateLeg2: new Date("2023-04-24"),
      returnDepartureCityLeg2: "Las Vegas",
      returnArrivalCityLeg2: "Chicago",
      costOriginal: 800,
      originalCurrency: "USD",
      costUSD: 800,
      bookingReferenceDocument: "GHI456JKL",
      notes: "A quick weekend escape!",
  
    },
    // You can add more travel objects here if needed
  ];
  export const fakeAccommodations: Accommodation[] = [
    {
      id: 1,
      name: "Oceanview Resort",
      status: "Confirmed",
      travelerUserId: "Summer Vacation",
      relatedTripTravelId: "Nader",
      city: "Miami",
      checkInDate: new Date("2023-01-15"),
      checkOutDate: new Date("2023-01-20"),
      totalCost: 450.00,
      bookingConfirmationDocument: "doc_12345",
    
    },
    {
      id: 2,
      name: "Mountain Escape",
      status: "Pending",
      travelerUserId: "Weekend Getaway",
      relatedTripTravelId: "Nathaniel",
      city: "Aspen",
      checkInDate: new Date("2023-02-10"),
      checkOutDate: new Date("2023-02-15"),
      totalCost: 600.00,
      bookingConfirmationDocument: "doc_67890",
      
    },
    {
      id: 3,
      name: "Urban Central Hotel",
      status: "Cancelled",
      travelerUserId: "Business Trip",
      relatedTripTravelId: "Gerorge",
      city: "New York",
      checkInDate: new Date("2023-03-05"),
      checkOutDate: new Date("2023-03-08"),
      totalCost: 700.00,
      bookingConfirmationDocument: "doc_24680",
     
    },
    // ... additional fake data entries
  ];