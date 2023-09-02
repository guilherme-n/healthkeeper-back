export class SpecialtyAlreadyRegisteredError extends Error {
  constructor() {
    super("Specialty already registered");
  }
}
