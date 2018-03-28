import { Validator, ControllerValidateResult, ValidateResult } from "aurelia-validation";
import { Validation } from "mean-au-ts-shared";
import { autoinject } from "aurelia-framework";
import { IValidator, ValidationError } from "shared/services/validator/validator.service";

@autoinject
export class AureliaValidator implements IValidator {
  constructor (
    private validator: Validator
  ) { }

  validateObject(obj: object): Promise<ValidateResult[]> {
    return this.validator.validateObject(obj).then(results => {
      let errorResults = Validation.getErrorResults(results);
      let isValid = errorResults.length === 0;
      
      if (!isValid) throw new ValidationError(errorResults)

      return results;
    })
  }
}
