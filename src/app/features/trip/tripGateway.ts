import { TravelGateway, Trip, TripGateway } from '@/interfaces';

export class ApiTripGateway implements TripGateway {
  async fetchTrips(
    url: string,
    options: { id?: number; userId?: string; userRole?: string }
  ): Promise<Trip[]> {
    let finalUrl = url;

    // if (
    //   options.userRole === 'validator' ||
    //   options.userRole === 'agent' ||
    //   options.userRole === 'financial'
    // ) {
    //   finalUrl = `${url}/admin`;
    // } else if (options.id) {
    //   finalUrl = `${url}/${options.id}`;
    // }

    const headers = new Headers();
    if (options.userId) {
      headers.append('user-id', options.userId);
     }

    const response = await fetch(finalUrl, { headers });
   
    const trips = await response.json();
    return trips;
  }
  async fetchSingleTrip(url: string): Promise<Trip> {
   const response = await fetch(url);
    const trip =await response.json();
    return trip;
  }
}
