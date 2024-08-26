import { Cost } from './app/costs table/column-costs';
import { DocumentTrip } from './app/documents-table/column';
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
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
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
    notes: null, // Nullable field\
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-10'),
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
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  // You can add more travel objects here if needed
];
  
export const expenseData = [
  {
    id: 1,
    date: '20/04/24',
    description: 'Flight to Nice',
    category: 'Flight',
    amount: '$500',
  },
  {
    id: 2,
    date: '21/04/24',
    description: 'Hotel in Nice',
    category: 'Accommodation',
    amount: '$300',
  },
  {
    id: 3,
    date: '22/04/24',
    description: 'Lunch with clients',
    category: 'Food',
    amount: '$50',
  },
  // Add more expenses as needed
];
export  const fakeCostData: Cost[] = [
  {
    type: 'Flight',
    amountUSD: 500,
    amountGBP: 400,
    amountEUR: 450,
    actualAmount: 500,
    limitAmount: 600,
  },
  {
    type: 'Hotel',
    amountUSD: 300,
    amountGBP: 240,
    amountEUR: 270,
    actualAmount: 320,
    limitAmount: 350,
  },
  {
    type: 'Car Rental',
    amountUSD: 200,
    amountGBP: 160,
    amountEUR: 180,
    actualAmount: 200,
    limitAmount: 250,
  },
  {
    type: 'Meals',
    amountUSD: 100,
    amountGBP: 80,
    amountEUR: 90,
    actualAmount: 110,
    limitAmount: 150,
  },
  {
    type: 'Miscellaneous',
    amountUSD: 50,
    amountGBP: 40,
    amountEUR: 45,
    actualAmount: 55,
    limitAmount: 100,
  },
];




export const fakeAccommodations: Accommodation[] = [
  {
    id: 1,
    name: 'Oceanview Resort',
    hotelName: 'Beachfront Hotel',
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
    hotelName: 'Ski Resort',
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
    hotelName: 'City Center Hotel',
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
