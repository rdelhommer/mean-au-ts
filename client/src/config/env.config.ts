export abstract class IEnv {
  abstract localStorage: {
    authKey: string,
    userKey: string
  }
}

export class Env implements IEnv {
  localStorage: {
    authKey: string,
    userKey: string
  } = {
    authKey: 'AUTH_TOKEN',
    userKey: 'CURRENT_USER'
  }
}
