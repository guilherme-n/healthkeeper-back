import { SearchParamsNotProvidedError } from "./search-params-not-provided-error";
import { EmailAlreadyRegisteredError } from "../../services/errors/email-already-registered-error";
import { SpecialtyAlreadyRegisteredError } from "../../services/errors/specialty-already-registered-error";
import { InvalidCredentialsError } from "./invalid-credentials-errors";

export {
  SearchParamsNotProvidedError,
  EmailAlreadyRegisteredError,
  InvalidCredentialsError,
  SpecialtyAlreadyRegisteredError,
};
