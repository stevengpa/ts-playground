import axios from 'axios';

import { StarWarsPeopleResponse } from '../models/StarWarsPerson.model';

export class StarWarsService {
  private baseUrl: string = 'https://swapi.dev/api';

  public async getPeople(): Promise<StarWarsPeopleResponse> {
    return await axios.get(`${this.baseUrl}/people/?format=json`);
  }
}
