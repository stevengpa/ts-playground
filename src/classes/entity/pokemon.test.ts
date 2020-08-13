import { Pokemon } from './pokemon';

describe('Pokemon Entity', () => {
  describe('validateWeight', () => {
    test('should throw an error when weight is less than or equal zero', () => {
      expect(() => new Pokemon(123, 'Pikachu', -1)).toThrow('Weight cannot be less or equal than zero.');
    });
  });
});
