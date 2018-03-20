export abstract class IEnv {
  abstract localStorage: {
    authKey: string
  }
}

export class Env implements IEnv {
  localStorage: {
    authKey: string
  } = {
    authKey: 'AUTH_KEY'
  }
}