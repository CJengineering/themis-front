import { Accommodation, Travel } from './type';

export const travels: Travel[] = [
  {
    id: 1,
    status: 'Pending',
    name: 'Summer Vacation',
    userId: 123,
    userFullName: 'John Doe',
    tripType: true, // Assuming true represents 'Round Trip'
    departureCity: 'New York',
    arrivalCity: 'Paris',
    departureDate: new Date('2023-06-15'),
    returnDate: new Date('2023-07-05'),
    costOriginal: 1200,
    originalCurrency: 'EUR',
    costUSD: 1400,
    bookingReferenceDocument: 'ABC123XYZ',
    notes: 'This is going to be an amazing trip!',
  },
  {
    id: 2,
    status: 'Confirmed',
    name: 'Business Trip',
    userId: 456,
    userFullName: 'Alice Johnson',
    tripType: false, // Assuming false represents 'One-Way'
    departureCity: 'Los Angeles',
    arrivalCity: 'New York',
    departureDate: new Date('2023-02-10'),
    returnDate: null, // null or omit if one-way
    costOriginal: 500,
    originalCurrency: 'USD',
    costUSD: 500,
    bookingReferenceDocument: 'DEF789ABC',
    notes: null, // Nullable field
  },
  {
    id: 3,
    status: 'Pending',
    name: 'Weekend Getaway',
    userId: 789,
    userFullName: 'Emma Wilson',
    tripType: true, // Assuming true represents 'Round Trip'
    departureCity: 'Chicago',
    arrivalCity: 'Las Vegas',
    departureDate: new Date('2023-04-22'),
    returnDate: new Date('2023-04-24'),
    costOriginal: 800,
    originalCurrency: 'USD',
    costUSD: 800,
    bookingReferenceDocument: 'GHI456JKL',
    notes: 'A quick weekend escape!',
  },
  // You can add more travel objects here if needed
];
export const fakeAccommodations: Accommodation[] = [
  {
    id: 1,
    name: 'Oceanview Resort',
    status: 'Confirmed',
    travelerUserId: 'Summer Vacation',
    relatedTripTravelId: 'Nader',
    city: 'Miami',
    checkInDate: new Date('2023-01-15'),
    checkOutDate: new Date('2023-01-20'),
    totalCost: 450.0,
    bookingConfirmationDocument: 'doc_12345',
  },
  {
    id: 2,
    name: 'Mountain Escape',
    status: 'Pending',
    travelerUserId: 'Weekend Getaway',
    relatedTripTravelId: 'Nathaniel',
    city: 'Aspen',
    checkInDate: new Date('2023-02-10'),
    checkOutDate: new Date('2023-02-15'),
    totalCost: 600.0,
    bookingConfirmationDocument: 'doc_67890',
  },
  {
    id: 3,
    name: 'Urban Central Hotel',
    status: 'Cancelled',
    travelerUserId: 'Business Trip',
    relatedTripTravelId: 'Gerorge',
    city: 'New York',
    checkInDate: new Date('2023-03-05'),
    checkOutDate: new Date('2023-03-08'),
    totalCost: 700.0,
    bookingConfirmationDocument: 'doc_24680',
  },
  // ... additional fake data entries
];
