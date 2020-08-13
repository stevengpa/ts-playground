export interface StarWarsPerson {
  name: string;
  gender: string;
}

export interface StarWarsPersonDTO extends StarWarsPerson {
  birthYear: string;
  height: number;
}

export interface StarWarsPersonResponse extends StarWarsPerson {
  birth_year: string;
  height: string;
}

export interface StarWarsPeopleResponse {
  data: {
    count: number;
    results: Array<StarWarsPersonResponse>;
  };
}

export interface StarWarsPeopleDTO {
  count: number;
  people: Array<StarWarsPersonDTO>;
}
