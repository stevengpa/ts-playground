export class Pokemon {
  readonly #id: number;
  readonly #name: string;
  readonly #weight: number;

  constructor(id: number, name: string, weight: number) {
    this.#id = id;
    this.#name = name;
    this.validateWeight(weight);
    this.#weight = weight;
  }

  get id(): number {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get weight(): number {
    return this.#weight;
  }

  validateWeight(weight: number): void {
    if (weight <= 0) {
      throw new Error('Weight cannot be less or equal than zero.');
    }
  }

  toJSON(): Record<string, any> {
    return {
      id: this.#id,
      name: this.#name,
      weight: this.#weight,
    };
  }
}
