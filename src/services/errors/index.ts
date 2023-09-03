import { SearchParamsNotProvidedError } from "./search-params-not-provided-error";
import { EmailAlreadyRegisteredError } from "../../services/errors/email-already-registered-error";
import { SpecialtyAlreadyRegisteredError } from "../../services/errors/specialty-already-registered-error";
import { InvalidCredentialsError } from "./invalid-credentials-error";
import { ForeignKeyConstraintError } from "./foreign-key-constraint-error";

export {
  SearchParamsNotProvidedError,
  EmailAlreadyRegisteredError,
  InvalidCredentialsError,
  SpecialtyAlreadyRegisteredError,
  ForeignKeyConstraintError,
};
