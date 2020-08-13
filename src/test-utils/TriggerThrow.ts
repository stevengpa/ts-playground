export class NoErrorThrownError extends Error {}

export class TriggerThrow {
  static async apply<TError>(call: () => unknown): Promise<TError> {
    try {
      await call();

      throw new NoErrorThrownError();
    } catch (error: unknown) {
      return error as TError;
    }
  }
}
