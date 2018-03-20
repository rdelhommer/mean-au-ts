import { customElement, bindable } from "aurelia-framework";
import { FormGroup } from "../form-group/form-group";
import { children } from "aurelia-templating";

@customElement('form-wrap')
export class FormWrap {
  private formMap: Map<string, FormGroup>;

  @children('form-group') formGroups: FormGroup[];

  clear() {
    this.formGroups.forEach(fg => fg.value = null);
  }

  toObject() {
    let ret = {};

    this.formGroups.forEach(fg => ret[fg.for] = fg.value);

    return ret;
  }

  getValue(propertyKey: string): string {
    return this.formMap.get(propertyKey).value;
  }

  attached() {
    this.formMap = new Map<string, FormGroup>();

    this.formGroups.forEach(fg => this.formMap.set(fg.for, fg));
  }
}