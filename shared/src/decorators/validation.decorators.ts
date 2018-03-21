import {FluentRuleCustomizer, Rule} from 'aurelia-validation';

/**
 * TODO
 * This was implemented in this fashion because I couldn't get reflect-metadata to work
 * it would be great to get this working with reflect-metadata in the future
 */

export const validationProperty = '__meanValidation__';

export function required(message?: string): any {
  return function (target: Object, propertyKey: string | symbol): void {
    addValidationToObject(target, propertyKey, (rules: FluentRuleCustomizer<any, any>) => {
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
    addValidationToObject(target, propertyKey, (rules: FluentRuleCustomizer<any, any>) => {
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
    addValidationToObject(target, propertyKey, (rules: FluentRuleCustomizer<any, any>) => {
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
    addValidationToObject(target, propertyKey, (rules: FluentRuleCustomizer<any, any>) => {
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

function addValidationToObject(target: Object, propertyKey: string | symbol, ruleFactory: (rules: FluentRuleCustomizer<any, any>) => FluentRuleCustomizer<any, any>) {
  if (!target[validationProperty]) {
    target[validationProperty] = {};
  }

  target[validationProperty][propertyKey] = ruleFactory;
}
