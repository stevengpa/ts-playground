import {
  StarWarsPeopleDTO,
  StarWarsPeopleResponse,
  StarWarsPersonDTO,
  StarWarsPersonResponse,
} from '../models/StarWarsPerson.model';

export class StarWarsPersonApplication {
  public async transformStarWarsPeopleList(
    starWarsPeopleResponse: StarWarsPeopleResponse
  ): Promise<StarWarsPeopleDTO> {
    const people = starWarsPeopleResponse.data.results.map(
      (starWarsPerson: StarWarsPersonResponse): StarWarsPersonDTO => ({
        name: starWarsPerson.name,
        gender: starWarsPerson.gender,
        height: Number.parseInt(starWarsPerson.height),
        birthYear: starWarsPerson.birth_year,
      })
    );

    const count = starWarsPeopleResponse.data.count;

    return {
      people,
      count,
    };
  }

  public async getPeopleHeightGreaterThan(
    starWarsPeople: Array<StarWarsPersonDTO>,
    height: number = 0
  ): Promise<Array<StarWarsPersonDTO>> {
    return starWarsPeople.filter(
      (starWarsPerson) => starWarsPerson.height > height
    );
  }
}
