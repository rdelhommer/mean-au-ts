import { customElement, bindable } from "aurelia-framework";
import { FormGroup } from "../form-group/form-group";
import { children } from "aurelia-templating";

@customElement('form-wrap')
export class FormWrap {
  @bindable novalidate: boolean;
  @bindable model: any;

  @children('form-group') formGroups: FormGroup[];

  clear() {
    this.formGroups.forEach(fg => fg.value = null);
  }

  toObject() {
    let ret = {};

    this.formGroups.forEach(fg => ret[fg.for] = fg.value);

    return ret;
  }

  getValue<T = object>(propertyKey: keyof T): string {
    let formGroup = this.formGroups.find(fg => fg.for === propertyKey);
    return formGroup ? formGroup.value : undefined;
  }

  formGroupsChanged(n, o) {
    this.formGroups.forEach(fg => fg.model = this.model);
  }
}
