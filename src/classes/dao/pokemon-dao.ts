import { Pokemon } from '../entity/pokemon';
import axios, { AxiosResponse } from 'axios';

export class PokemonDao {
  private readonly FETCH_API_PATH_1: string = 'https://pokeapi.co/api/v2/pokemon/';
  readonly #FETCH_API_PATH_2: string = 'https://pokeapi.co/api/v2/pokemon/ditto';

  async getPokemonByName(pokemonName: string = ''): Promise<Pokemon | null> {
    const response: AxiosResponse = await axios.get(`${this.FETCH_API_PATH_1}${pokemonName}`);

    const pokemon = await response?.data;

    if (typeof pokemon !== 'object') {
      return null;
    }

    const { id, name, weight } = pokemon;

    return new Pokemon(id, name, weight);
  }

  getFetchAPI2(): string {
    return this.#FETCH_API_PATH_2;
  }
}
