import { initialize } from 'aurelia-pal-nodejs';
import { Container } from 'aurelia-dependency-injection';
import { configure as configureBindingLanguage } from 'aurelia-templating-binding';
import { configure as configureValidation, ValidationRules, Validator, Rule, ValidateResult, ControllerValidateResult } from 'aurelia-validation';
import { HandlerError } from 'api/handler.error';
import { Controller } from '../../../shared/node_modules/aurelia-templating';
import { Validation } from 'mean-au-ts-shared';

class AureliaValidator {
  private validator: Validator

  constructor() {
    initialize();
    const container = new Container();
    configureBindingLanguage({ container });
    configureValidation({ container });

    this.validator = container.get(Validator);
  }

  validateObject(object: any): Promise<ValidateResult[]> {
    return this.validator.validateObject(object).then(results => {
      let errorResults = Validation.getErrorResults(results);
      let isValid = errorResults.length === 0;

      if (!isValid) throw new HandlerError(422, errorResults[0].message)

      return results
    });
  }
}

export const aureliaValidator = new AureliaValidator();
