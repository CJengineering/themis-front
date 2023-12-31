import { TravelGateway } from "@/interfaces";
import { Travel } from "@/type";


export class ApiTravelGateway implements TravelGateway {
    async fetchTravels(url: string, id?: number): Promise<Travel[]> {
        const finalUrl = id ? `${url}/${id}` : url;
        const headers = new Headers();
        headers.append('user-id', '1');
        const response = await fetch(finalUrl, { headers });
        const travels = await response.json();
        return travels;
    }
}