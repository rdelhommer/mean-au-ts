import { customElement, bindable } from "aurelia-framework";
import { Utilities } from "mean-au-ts-shared";

@customElement('form-group')
export class FormGroup {

  @bindable for: string
  @bindable placeholder: string
  @bindable type: string
  @bindable autofocus: boolean
  
  value: string
  id: string = Utilities.newGuid()

  bind() {
    this.type = this.type || 'text';
  }
}