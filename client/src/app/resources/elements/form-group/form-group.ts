import { customElement, bindable, observable } from "aurelia-framework";
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

  @observable value: string
  id: string = Utilities.newGuid()

  clear() {
    this.value = undefined;
  }

  modelChanged() {
    // Defer the refresh so input masking doesn't barf
    if (!this.isAttached) {
      this.defferedRefresh = () => {
        this.value = this.model[this.for];
      }
    } else {
      this.value = this.model[this.for];
    }
  }
  
  valueChanged() {
    this.model[this.for] = this.value;
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
