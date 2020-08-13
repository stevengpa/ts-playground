import axios from 'axios';

import { PokemonDao } from './pokemon-dao';
import { TriggerThrow, NoErrorThrownError } from '../../test-utils/TriggerThrow';

import spyOn = jest.spyOn;

jest.mock('axios', () => ({
  get: jest.fn((url: string) => Promise.resolve(url)),
}));

describe('Pokemon DAO', () => {
  it('should exists', () => {
    expect(PokemonDao).toBeTruthy();
  });

  it('should make http request to api 1', async () => {
    // Arrange
    const fetchPokeAPI = jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve(null));

    const api1 = 'https://pokeapi.co/api/v2/pokemon/dittos';
    const pokemonDao: PokemonDao = new PokemonDao();
    // Act
    await pokemonDao.getPokemonByName('dittos');
    // Assert
    expect(fetchPokeAPI).toHaveBeenCalledWith(api1);
    // Clean
    fetchPokeAPI.mockRestore();
  });

  it('should replace private url value from api 1 to api x', async () => {
    // Arrange
    const fetchPokeAPI = jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve(null));

    const pokemonName: string = 'dittos';
    const apiX = 'https://google.com/';

    const pokemonDao: PokemonDao = new PokemonDao();
    Reflect.set(pokemonDao, 'FETCH_API_PATH_1', apiX);
    // Act
    await pokemonDao.getPokemonByName(pokemonName);
    // Assert
    const expected = `${apiX}${pokemonName}`;
    expect(fetchPokeAPI).toHaveBeenCalledWith(expected);
    // Clean
    fetchPokeAPI.mockRestore();
  });

  it('should get api 2 url', () => {
    // Arrange
    const fetchPokeAPI = jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve(null));

    const pokemonDao: PokemonDao = new PokemonDao();
    // Act
    const actual = pokemonDao.getFetchAPI2();
    const expected = 'https://pokeapi.co/api/v2/pokemon/ditto';
    // Assert
    expect(actual).toStrictEqual(expected);
    // Clean
    fetchPokeAPI.mockRestore();
  });

  it('should not replace url value from api 2 to api x', () => {
    // Arrange
    const fetchPokeAPI = jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve(null));

    const pokemonDao: PokemonDao = new PokemonDao();
    const apix = 'https://google.com/api/v2/pokemon/ditto';
    Reflect.set(pokemonDao, 'FETCH_API_PATH_2', apix);
    // Act
    const actual = pokemonDao.getFetchAPI2();
    const expected = 'https://pokeapi.co/api/v2/pokemon/ditto';
    // Assert
    expect(actual).toStrictEqual(expected);
    // Clean
    fetchPokeAPI.mockRestore();
  });

  it('should throw an error when weight is less than or equal zero', async () => {
    // Arrange
    const pokemonDao = new PokemonDao();

    spyOn(axios, 'get').mockReturnValue(
      Promise.resolve({
        data: {
          id: 123,
          name: 'Pikachu',
          weight: 0,
        },
      })
    );

    // Act
    const error = await TriggerThrow.apply<Error>(async () => pokemonDao.getPokemonByName());

    // Assert
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toMatch('Weight cannot be less or equal than zero.');
  });
});
