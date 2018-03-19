import * as owaspPassword from 'owasp-password-strength-test';
import { config } from 'config/config';

class Owasp {
  constructor() {
    owaspPassword.config(config.password.owasp);
  }

  test(password: string): owaspPassword.TestResult {
    return owaspPassword.test(password);
  }
}

export const owasp = new Owasp();
