export class ForeignKeyConstraintError extends Error {
  constructor() {
    super("Foreign key constraint error");
  }
}
