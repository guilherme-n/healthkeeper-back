export class SearchParamsNotProvidedError extends Error {
  constructor() {
    super("Search params not provided");
  }
}
