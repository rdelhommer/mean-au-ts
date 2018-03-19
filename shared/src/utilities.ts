import * as _ from 'lodash';

export namespace Utilities {
  export function newGuid() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  
  export function castTo<T = object>(obj: any, CastTo: new () => T): T {
    return maskObject(new CastTo(), obj);

    function maskObject<T = object>(target: T, source: any): T {
      for(var key in target) {
        if (typeof(target[key]) == 'object' && !Array.isArray(target[key])) {
          target[key] = this.maskObject(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
      return target;
    }
  }
}
