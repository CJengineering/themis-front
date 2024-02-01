import { User, UserGateway } from '@/interfaces';

export class ApiUserGateway implements UserGateway {
  async fetchUser(url: string): Promise<User> {
    let finalUrl = url;
    const response = await fetch(finalUrl);
    const user = await response.json();
    return user;
  }
}
