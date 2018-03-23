import {FluentRuleCustomizer, Rule} from 'aurelia-validation';

/**
 * TODO
 * This was implemented in this fashion because I couldn't get reflect-metadata to work
 * it would be great to get this working with reflect-metadata in the future
 */

export const validationProperty = '__meanValidation__';

export function required(message?: string): any {
  return function (target: Object, propertyKey: string | symbol): void {
    addValidationToObject(target, propertyKey, 'required', (rules: FluentRuleCustomizer<any, any>) => {
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
    addValidationToObject(target, propertyKey, 'email', (rules: FluentRuleCustomizer<any, any>) => {
      return rules.ensure(propertyKey.toString()).satisfies((v: string) => {
        let regex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        return !v || regex.test(v);
      }).withMessage(message || 'The email address you provided is not valid')
    });
  };
}

export function password(message?: string): any {
  return function (target: Object, propertyKey: string | symbol): void {
    addValidationToObject(target, propertyKey, 'password', (rules: FluentRuleCustomizer<any, any>) => {
      return rules
        .ensure(propertyKey.toString()).satisfies((v: string) => {
          return !v || v.length >= 8;
        }).withMessage(message ? `${message}  Passwords must be at least 8 characters long` : `The password you provided is invalid.  Passwords must be at least 8 characters long`)
        .ensure(propertyKey.toString()).satisfies((v: string) => {
          let regex = new RegExp(/\W/)
          return !v || regex.test(v);
        }).withMessage(message ? `${message}  Passwords must contain a symbol` : `The password you provided is invalid.  Passwords must contain a symbol`)
        .ensure(propertyKey.toString()).satisfies((v: string) => {
          let regex = new RegExp(/\d/)
          return !v || regex.test(v);
        }).withMessage(message ? `${message}  Passwords must contain a number` : `The password you provided is invalid.  Passwords must contain a number`)
    });
  };
}

export function phone(message?: string): any {
  return function (target: Object, propertyKey: string | symbol): void {
    addValidationToObject(target, propertyKey, 'phone', (rules: FluentRuleCustomizer<any, any>) => {
      return rules.ensure(propertyKey.toString()).satisfies((v: string) => {
        let regex = new RegExp(/^\(\d{3}\)\s\d{3}-\d{4}/);
        return !v || regex.test(v);
      }).withMessage(message || 'The phone number you provided is not valid')
    });
  };
}

export function sameAs<T>(otherPropertyKey: keyof T, message: string): any {
  return function (target: Object, propertyKey: string | symbol): void {
    addValidationToObject(target, propertyKey, 'sameAs', (rules: FluentRuleCustomizer<any, any>) => {
      return rules.ensure(propertyKey.toString()).satisfies((v: any, o: T) => {
        return v === o[otherPropertyKey];
      }).withMessage(message)
    });
  };
}

function addValidationToObject(target: Object, propertyKey: string | symbol, ruleName: string, ruleFactory: (rules: FluentRuleCustomizer<any, any>) => FluentRuleCustomizer<any, any>) {
  if (!target[validationProperty]) {
    target[validationProperty] = {};
  }

  if (!target[validationProperty][propertyKey]) {
    target[validationProperty][propertyKey] = {};
  }

  target[validationProperty][propertyKey][ruleName] = ruleFactory;
}
