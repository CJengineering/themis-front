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

export const oldTravelDataJSON= [{"id":17,"status":"Finalisation","name":" NC <-> CR | ND","userId":35,"userFullName":"Nathaniel Daudrich","tripType":true,"departureCity":"Nice","arrivalCity":"Cairo","departureDate":"2024-02-10T00:00:00.000Z","returnDate":"2024-02-16T00:00:00.000Z","costOriginal":1643,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/17-1706691140105-Confirmation 44PV7D3 ND 10.02.2024.pdf?version=v1","notes":"","createdAt":"2024-01-23T14:28:38.931Z","updatedAt":"2024-01-31T08:52:39.228Z"},{"id":19,"status":"Finalisation","name":" LND <-> MNC | HE","userId":51,"userFullName":"Hala El Masri","tripType":true,"departureCity":"London","arrivalCity":"Monaco","departureDate":"2024-02-14T00:00:00.000Z","returnDate":"2024-02-16T00:00:00.000Z","costOriginal":671,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/19-1706110145055-Confirmation 44Q5CKN Hala El Masri.pdf?version=v1","notes":"","createdAt":"2024-01-24T11:16:17.690Z","updatedAt":"2024-01-24T15:29:25.924Z"},{"id":32,"status":"Authentication","name":" PRS <-> CHN | CD","userId":12,"userFullName":"Cléa Daridan","tripType":true,"departureCity":"Paris","arrivalCity":"Chennai","departureDate":"2024-03-25T00:00:00.000Z","returnDate":"2024-03-29T00:00:00.000Z","costOriginal":4550,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/32-1710411737243-Flights options for Cléa Chennai.pdf?version=v1","notes":"","createdAt":"2024-02-29T14:16:50.972Z","updatedAt":"2024-03-14T10:22:27.626Z"},{"id":15,"status":"Finalisation","name":" MNC <-> LND | GR","userId":36,"userFullName":"George Richards","tripType":true,"departureCity":"Monaco","arrivalCity":"London","departureDate":"2024-02-20T00:00:00.000Z","returnDate":"2024-02-23T00:00:00.000Z","costOriginal":1700,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/15-1706110554027-Confirmation 44PQTSJ GR BTF 20.02.24.pdf?version=v1","notes":"","createdAt":"2024-01-23T10:01:09.772Z","updatedAt":"2024-01-24T15:35:58.041Z"},{"id":30,"status":"Authentication","name":" LND <-> NRB | ND","userId":30,"userFullName":"Nader Diab","tripType":true,"departureCity":"London","arrivalCity":"Nairobi","departureDate":"2024-02-21T00:00:00.000Z","returnDate":"2024-02-24T00:00:00.000Z","costOriginal":3359,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/30-1708525621913-Confirmation 44WT4MH Nader.pdf?version=v1","notes":"","createdAt":"2024-02-16T14:16:09.253Z","updatedAt":"2024-02-21T14:27:08.499Z"},{"id":16,"status":"Finalisation","name":" MNC <-> LND | GR","userId":36,"userFullName":"George Richards","tripType":true,"departureCity":"Monaco","arrivalCity":"London","departureDate":"2024-02-12T00:00:00.000Z","returnDate":"2024-02-14T00:00:00.000Z","costOriginal":1263.3,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/16-1706114086025-Confirmation 44Q5WZG GR BTF 12.02.24.pdf?version=v1","notes":"","createdAt":"2024-01-23T10:01:38.877Z","updatedAt":"2024-01-24T16:34:52.816Z"},{"id":37,"status":"Validation","name":" MNC <-> MDR | GR","userId":36,"userFullName":"George Richards","tripType":false,"departureCity":"Monaco","arrivalCity":"Madrid","departureDate":"2024-05-29T00:00:00.000Z","returnDate":null,"costOriginal":1974,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/37-1715842408261-Confirmation 45KQM28 GR's buisness trip Madrid.pdf?version=v1","notes":"","createdAt":"2024-04-19T10:21:00.294Z","updatedAt":"2024-05-16T06:53:28.840Z"},{"id":23,"status":"Approval","name":" PRS <-> LND | CD","userId":12,"userFullName":"Cléa Daridan","tripType":true,"departureCity":"Paris","arrivalCity":"London","departureDate":"2024-03-18T00:00:00.000Z","returnDate":"2024-03-19T00:00:00.000Z","costOriginal":800,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/23-1707489942512-Cléa's travel options 18.03.2024.pdf?version=v1","notes":"","createdAt":"2024-02-05T15:07:10.374Z","updatedAt":"2024-02-13T17:18:43.336Z"},{"id":18,"status":"Finalisation","name":" DB <-> MNC | BH","userId":46,"userFullName":"Basma Hamza","tripType":true,"departureCity":"Dubai","arrivalCity":"Monaco","departureDate":"2024-02-14T00:00:00.000Z","returnDate":"2024-02-16T00:00:00.000Z","costOriginal":1225,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/18-1706274565031-Confirmation 44PZT54 Basma.pdf?version=v1","notes":"","createdAt":"2024-01-24T11:04:55.832Z","updatedAt":"2024-01-26T13:09:25.466Z"},{"id":20,"status":"Finalisation","name":" LND <-> CP | US","userId":21,"userFullName":"Uzma Safiya Balkiss Sulaiman","tripType":true,"departureCity":"London","arrivalCity":"Cape Town","departureDate":"2024-03-08T00:00:00.000Z","returnDate":"2024-03-15T00:00:00.000Z","costOriginal":5500,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/20-1706952751455-Confirmation 44R36HZ Uzma 08.03.24.pdf?version=v1","notes":"","createdAt":"2024-01-29T06:05:57.462Z","updatedAt":"2024-02-03T09:32:34.675Z"},{"id":27,"status":"Finalisation","name":" LND <-> NRB | GR","userId":36,"userFullName":"George Richards","tripType":false,"departureCity":"London","arrivalCity":"Nairobi","departureDate":"2024-02-22T00:00:00.000Z","returnDate":null,"costOriginal":2500,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/27-1708527840507-Confirmation 44PQTSJ gr BTF.pdf?version=v1","notes":"","createdAt":"2024-02-14T10:38:25.707Z","updatedAt":"2024-02-21T15:05:34.227Z"},{"id":21,"status":"Finalisation","name":" MNC <-> LND | GR","userId":36,"userFullName":"George Richards","tripType":true,"departureCity":"Monaco","arrivalCity":"London","departureDate":"2024-02-05T00:00:00.000Z","returnDate":"2024-02-07T00:00:00.000Z","costOriginal":1505,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/21-1706526139681-Confirmation 44R38RT GR 05.02.2024.pdf?version=v1","notes":"","createdAt":"2024-01-29T08:53:26.504Z","updatedAt":"2024-01-29T11:02:44.674Z"},{"id":29,"status":"Finalisation","name":" NRB <-> MNC | GR","userId":36,"userFullName":"George Richards","tripType":false,"departureCity":"Nairobi","arrivalCity":"Monaco","departureDate":"2024-02-23T00:00:00.000Z","returnDate":null,"costOriginal":2035,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/29-1708527993885-Confirmation 44PQTSJ gr BTF.pdf?version=v1","notes":"","createdAt":"2024-02-16T10:16:34.832Z","updatedAt":"2024-02-21T15:06:34.178Z"},{"id":36,"status":"Finalisation","name":" MNC <-> LND | GR","userId":36,"userFullName":"George Richards","tripType":true,"departureCity":"Monaco","arrivalCity":"London","departureDate":"2024-04-21T00:00:00.000Z","returnDate":"2024-04-26T00:00:00.000Z","costOriginal":3235,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/36-1712913109723-George's London April 2024.pdf?version=v1","notes":"","createdAt":"2024-04-11T13:45:52.870Z","updatedAt":"2024-04-16T14:42:51.992Z"},{"id":26,"status":"Finalisation","name":" MNC <-> LND | GR","userId":36,"userFullName":"George Richards","tripType":true,"departureCity":"Monaco","arrivalCity":"London","departureDate":"2024-03-05T00:00:00.000Z","returnDate":"2024-03-07T00:00:00.000Z","costOriginal":1390,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/26-1708528072026-Confirmation 44VBBW3 GR March 2024.pdf?version=v1","notes":"","createdAt":"2024-02-12T07:17:42.496Z","updatedAt":"2024-02-21T15:07:57.409Z"},{"id":25,"status":"Approval","name":" LND <-> PRS | ND","userId":30,"userFullName":"Nader Diab","tripType":true,"departureCity":"London","arrivalCity":"Paris","departureDate":"2024-03-03T00:00:00.000Z","returnDate":"2024-03-05T00:00:00.000Z","costOriginal":650,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/25-1707404973893-Nader proposal 08022024.pdf?version=v1","notes":"","createdAt":"2024-02-08T14:59:35.759Z","updatedAt":"2024-02-08T15:44:38.177Z"},{"id":34,"status":"Approval","name":" LND <-> STN | HE","userId":51,"userFullName":"Hala El Masri","tripType":true,"departureCity":"London","arrivalCity":"Istanbul","departureDate":"2024-03-22T00:00:00.000Z","returnDate":"2024-03-25T00:00:00.000Z","costOriginal":765,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/34-1712842234665-Confirmation 455ZSZ5 Paid with GR's card 765GBP.pdf?version=v1","notes":"","createdAt":"2024-03-21T11:16:19.333Z","updatedAt":"2024-04-12T16:11:10.542Z"},{"id":40,"status":"Authorisation","name":" PRS <-> BSL | CD","userId":12,"userFullName":"Cléa Daridan","tripType":true,"departureCity":"Paris","arrivalCity":"Basel","departureDate":"2024-06-12T00:00:00.000Z","returnDate":"2024-06-13T00:00:00.000Z","costOriginal":385,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/40-1721893610928-Cléa - Art Basel June 2024.pdf?version=v1","notes":"","createdAt":"2024-05-15T07:58:06.604Z","updatedAt":"2024-07-25T07:46:51.355Z"},{"id":31,"status":"Authentication","name":" PRS <-> STN | CD","userId":12,"userFullName":"Cléa Daridan","tripType":true,"departureCity":"Paris","arrivalCity":"Istanbul","departureDate":"2024-05-29T00:00:00.000Z","returnDate":"2024-06-01T00:00:00.000Z","costOriginal":1723,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/31-1715841514544-Confirmation 45KQM28 Cléa's buisness trip Istanbul.pdf?version=v1","notes":"","createdAt":"2024-02-23T09:43:43.267Z","updatedAt":"2024-05-16T06:38:35.194Z"},{"id":39,"status":"Approval","name":" LND <-> NRB | ND","userId":30,"userFullName":"Nader Diab","tripType":true,"departureCity":"London","arrivalCity":"Nairobi","departureDate":"2024-05-08T00:00:00.000Z","returnDate":"2024-05-15T00:00:00.000Z","costOriginal":2702,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/39-1713969972662-Nader's upcoming BT May 2024.pdf?version=v1","notes":"","createdAt":"2024-04-24T14:42:53.125Z","updatedAt":"2024-06-18T12:52:14.752Z"},{"id":46,"status":"Authorisation","name":" LND <-> KLK | AS","userId":58,"userFullName":"Ambreen Shaikh","tripType":true,"departureCity":"London","arrivalCity":"Kolkata","departureDate":"2024-06-23T00:00:00.000Z","returnDate":"2024-06-28T00:00:00.000Z","costOriginal":2888.03,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/46-1718785404944-Confirmation 45QRFHF Ambreen June 24.pdf?version=v1","notes":"","createdAt":"2024-06-18T13:15:17.170Z","updatedAt":"2024-07-11T14:16:18.175Z"},{"id":42,"status":"Authentication","name":" CR <-> STN | MH","userId":72,"userFullName":"Melissa Howell","tripType":true,"departureCity":"Cairo","arrivalCity":"Istanbul","departureDate":"2024-05-31T00:00:00.000Z","returnDate":"2024-06-02T00:00:00.000Z","costOriginal":1520,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/42-1717143364028-Confirmation 45N49PZ - GBP 1520.pdf?version=v1","notes":"","createdAt":"2024-05-16T14:27:19.737Z","updatedAt":"2024-07-16T08:35:01.979Z"},{"id":55,"status":"Request","name":" LND <-> BST | ND","userId":30,"userFullName":"Nader Diab","tripType":true,"departureCity":"London","arrivalCity":"Boston","departureDate":"2024-09-24T00:00:00.000Z","returnDate":"2024-09-27T00:00:00.000Z","costOriginal":0,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"","notes":"","createdAt":"2024-08-29T08:44:06.747Z","updatedAt":"2024-08-29T08:44:06.747Z"},{"id":51,"status":"Authorisation","name":" LND <-> CR | US","userId":21,"userFullName":"Uzma Safiya Balkiss Sulaiman","tripType":true,"departureCity":"London","arrivalCity":"Cairo","departureDate":"2024-07-09T00:00:00.000Z","returnDate":"2024-07-11T00:00:00.000Z","costOriginal":1575,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/51-1719480392025-Confirmation 45TSK5W for Uzma.pdf?version=v1","notes":"","createdAt":"2024-06-25T14:47:01.239Z","updatedAt":"2024-07-11T14:14:10.431Z"},{"id":47,"status":"Authorisation","name":" MNC <-> RBT | GR","userId":36,"userFullName":"George Richards","tripType":false,"departureCity":"Monaco","arrivalCity":"Rabat","departureDate":"2024-06-30T00:00:00.000Z","returnDate":null,"costOriginal":2486,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/47-1719321955293-Confirmation 45SVV5S 30.06.2024.pdf?version=v1","notes":"","createdAt":"2024-06-20T14:44:08.758Z","updatedAt":"2024-07-11T14:15:46.976Z"},{"id":53,"status":"Authorisation","name":" LND <-> CR | AS","userId":58,"userFullName":"Ambreen Shaikh","tripType":true,"departureCity":"London","arrivalCity":"Cairo","departureDate":"2024-07-21T00:00:00.000Z","returnDate":"2024-07-25T00:00:00.000Z","costOriginal":1497,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/53-1721132031266-Confirmation 45YKYSX Ambreen.pdf?version=v1","notes":"","createdAt":"2024-07-09T13:56:06.308Z","updatedAt":"2024-07-16T12:13:51.552Z"},{"id":52,"status":"Authorisation","name":" PRS <-> CR | CD","userId":12,"userFullName":"Cléa Daridan","tripType":true,"departureCity":"Paris","arrivalCity":"Cairo","departureDate":"2024-09-06T00:00:00.000Z","returnDate":"2024-09-10T00:00:00.000Z","costOriginal":1300,"originalCurrency":"","costUSD":0,"bookingReferenceDocument":"https://storage.googleapis.com/cj-tech-381914-gabucket/52-1724245452710-Cléa's flights options.pdf?version=v1","notes":"","createdAt":"2024-07-02T07:33:17.196Z","updatedAt":"2024-08-21T13:04:33.685Z"}] 


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
