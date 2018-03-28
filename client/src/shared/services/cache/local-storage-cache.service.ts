import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { ICache } from "./cache.service";

@autoinject
export class LocalStorageCache implements ICache {
  constructor(private router: Router) {

  }

  private buildCacheKeyRoot(mode: ICache.Mode) {
    if (mode === ICache.Mode.Global) return `${mode}`;

    return `${mode}+${this.router.currentInstruction.config.route}`
  }

  private buildCacheKey(mode: ICache.Mode, key: string) {
    return `${this.buildCacheKeyRoot(mode)}+${key}`;
  }


  private getKeys(mode: ICache.Mode): string[] {
    let root = this.buildCacheKeyRoot(mode);
    return Object.keys(localStorage).filter(k => k.startsWith(`${root}+`))
  }

  clear(mode?: ICache.Mode) {
    if (!mode) {
      localStorage.clear();
      return;
    }

    this.getKeys(mode).forEach(k => 
        localStorage.removeItem(this.buildCacheKey(ICache.Mode.Global, k)));
  }

  set(mode: ICache.Mode, key: string, value: any) {
    if (value == null) return;

    localStorage.setItem(this.buildCacheKey(mode, key), JSON.stringify(value));
  }

  get(mode: ICache.Mode, key: string): object {
    let asJson = localStorage.getItem(this.buildCacheKey(mode, key));
    
    try {
      return JSON.parse(asJson)
    } catch (error) {
      return null;
    }
  }

  delete(mode: ICache.Mode, key: string) {
    localStorage.removeItem(this.buildCacheKey(mode, key));
  }
}
