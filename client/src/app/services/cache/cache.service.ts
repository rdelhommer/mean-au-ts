export abstract class ICache {
  abstract clear(mode?: ICache.Mode): void;
  abstract set(mode: ICache.Mode, key: string, value: any): void;
  abstract get(mode: ICache.Mode, key: string): any;
  abstract delete(mode: ICache.Mode, key: string): void;
}

export namespace ICache {
  export enum Mode {
    Global = 'global',
    Local = 'local'
  }
}