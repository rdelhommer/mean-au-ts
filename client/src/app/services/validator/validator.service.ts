import { ControllerValidateResult, ValidateResult } from "aurelia-validation";

export abstract class IValidator {
  abstract validateObject(obj: object): Promise<ControllerValidateResult>;
}

export class ValidationError extends Error {
  constructor(
    public errors: ValidateResult[]
  ) {
    super();
  }
}
