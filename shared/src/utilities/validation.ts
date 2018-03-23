import { ValidationRules, FluentRuleCustomizer, Rule, ValidateResult } from "aurelia-validation";
import { validationProperty } from "../decorators/validation.decorators";

export namespace Validation {
  /**
   * This function doesn't walk the prototype chain to find validation decorator metadata.
   * It will only look on the prototype of the object that is passed in.
   * @param object
   * @param validationRules
   */
  export function ensureDecoratorsOn(object: any, validationRules: ValidationRules | FluentRuleCustomizer<any, any>): Rule<any,any>[][] {
    if (!object.constructor.prototype[validationProperty]) return;

    let rules = validationRules;
    Object.keys(object.constructor.prototype[validationProperty]).forEach(propertyName => {
      Object.keys(object.constructor.prototype[validationProperty][propertyName]).forEach(ruleName => {
        rules = object.constructor.prototype[validationProperty][propertyName][ruleName](rules)
      })
    });

    return (<FluentRuleCustomizer<any, any>>rules).on(object.constructor).rules;
  }

  export function getErrorResults(results: ValidateResult[]): ValidateResult[] {
    return results.filter(r => !r.valid);
  }
}
