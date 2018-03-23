import { customElement, bindable } from "aurelia-framework";
import { Utilities } from "mean-au-ts-shared";

@customElement('form-group')
export class FormGroup {

  private isAttached: boolean;
  private defferedRefresh: () => void;

  @bindable for: string
  @bindable placeholder: string
  @bindable type: string
  @bindable autofocus: boolean
  @bindable model: any

  value: string
  id: string = Utilities.newGuid()

  modelChanged() {
    if (!this.isAttached) {
      // Defer the refresh so input masking doesn't barf
      this.defferedRefresh = () => {
        this.value = this.model[this.for];    
      }
    } else {
      this.value = this.model[this.for];
    }
  }

  bind() {
    this.type = this.type || 'text';
  }

  attached() {
    this.isAttached = true;

    if (this.defferedRefresh) {
      this.defferedRefresh();
    }
  }
}
