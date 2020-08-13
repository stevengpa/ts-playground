import { StarWarsService } from './business-logic/services/StarWars.service';
import { StarWarsPersonApplication } from './business-logic/application/StarWarsPerson.application';

const starWarsService = new StarWarsService();
const starWarsApp = new StarWarsPersonApplication();

const people = starWarsService
  .getPeople()
  .then(starWarsApp.transformStarWarsPeopleList)
  .then((starWars) =>
    starWarsApp.getPeopleHeightGreaterThan(starWars.people, 165)
  )
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
