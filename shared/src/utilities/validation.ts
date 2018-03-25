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
    let ctor = typeof object === 'function' ? object : object.constructor;
    if (!ctor || !ctor.prototype || !ctor.prototype[validationProperty]) return;

    let rules = validationRules;
    Object.keys(ctor.prototype[validationProperty]).forEach(propertyName => {
      Object.keys(ctor.prototype[validationProperty][propertyName]).forEach(ruleName => {
        rules = ctor.prototype[validationProperty][propertyName][ruleName](rules)
      })
    });

    return (<FluentRuleCustomizer<any, any>>rules).on(ctor).rules;
  }

  export function getErrorResults(results: ValidateResult[]): ValidateResult[] {
    return results.filter(r => !r.valid);
  }
}
