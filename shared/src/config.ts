export namespace SharedConfig {
  export const app: ISharedAppConfig = {
    appName: 'MEAN-AU-TS'
  }

  export interface ISharedAppConfig {
    appName: string
  }
}
