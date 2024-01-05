import { TravelGateway } from '@/interfaces';
import { Travel, TravelData } from '@/type';

export class ApiTravelGateway implements TravelGateway {
  async fetchTravels(
    url: string,
    options: { id?: number; userId?: string; userRole?: string }
  ): Promise<TravelData[]> {
    let finalUrl = url;

    if (options.userRole === 'admin' || options.userRole === 'agent') {
      finalUrl = `${url}/admin`;
    } else if (options.id) {
      finalUrl = `${url}/${options.id}`;
    }

    const headers = new Headers();
    if (options.userId) {
      headers.append('user-id', options.userId);
    }

    const response = await fetch(finalUrl, { headers });
    const travels = await response.json();
    return travels;
  }
}
