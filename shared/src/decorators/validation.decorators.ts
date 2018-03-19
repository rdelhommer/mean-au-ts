import {ValidationRules, FluentRuleCustomizer, Rule} from 'aurelia-validation';

/**
 * TODO
 * This was implemented in this fashion because I couldn't get reflect-metadata to work
 * it would be great to get this working with reflect-metadata in the future
 */

export const validationProperty = '__meanValidation__';

export function required(message?: string): any {
  return function (target: Object, propertyKey: string | symbol): void {
    addValidationToObject(target, (rules: FluentRuleCustomizer<any, any>) => {
      let ret = rules.ensure(propertyKey.toString()).required();

      if (message) {
        ret = ret.withMessage(message)
      }

      return ret;
    });
  };
}

export function email(message?: string): any {
  return function (target: Object, propertyKey: string | symbol): void {
    addValidationToObject(target, (rules: FluentRuleCustomizer<any, any>) => {
      let ret = rules.ensure(propertyKey.toString()).satisfies((v: string) => {
        // TODO
        return true;
      })

      if (message) {
        ret = ret.withMessage(message)
      }

      return ret;
    });
  };
}

export function password(message?: string): any {
  return function (target: Object, propertyKey: string | symbol): void {
    addValidationToObject(target, (rules: FluentRuleCustomizer<any, any>) => {
      let ret = rules.ensure(propertyKey.toString()).satisfies((v: string) => {
        // TODO
        return true;
      })

      if (message) {
        ret = ret.withMessage(message)
      }

      return ret;
    });
  };
}

export function phone(message?: string): any {
  return function (target: Object, propertyKey: string | symbol): void {
    addValidationToObject(target, (rules: FluentRuleCustomizer<any, any>) => {
      let ret = rules.ensure(propertyKey.toString()).satisfies((v: string) => {
        // TODO
        return true;
      })

      if (message) {
        ret = ret.withMessage(message)
      }

      return ret;
    });
  };
}

/**
 * This function doesn't walk the prototype chain to find validation decorator metadata.
 * It will only look on the prototype of the object that is passed in.
 * @param object 
 * @param validationRules 
 */
export function ensureDecoratorsOn(object: any, validationRules: ValidationRules | FluentRuleCustomizer<any, any>): Rule<any,any>[][] {
  if (!object.constructor.prototype[validationProperty]) return;

  let rules = validationRules;
  object.constructor.prototype[validationProperty].forEach((factory: (rules: ValidationRules | FluentRuleCustomizer<any, any>) => FluentRuleCustomizer<any, any>) => {
    rules = factory(rules);
  });

  return (<FluentRuleCustomizer<any, any>>rules).on(object.constructor).rules;
}

function addValidationToObject(target: Object, ruleFactory: (rules: FluentRuleCustomizer<any, any>) => FluentRuleCustomizer<any, any>) {
  if (!target[validationProperty]) {
    target[validationProperty] = [];
  }

  target[validationProperty].push(ruleFactory);
}
