import { customElement, bindable } from "aurelia-framework";
import { FormGroup } from "../form-group/form-group";
import { children } from "aurelia-templating";

@customElement('form-wrap')
export class FormWrap {
  @bindable novalidate: boolean;
  @bindable model: any;

  private isAttached: boolean;
  deferredRefresh: () => void;

  @children('form-group') formGroups: FormGroup[];

  clear() {
    this.formGroups.forEach(fg => fg.clear());
  }

  formGroupsChanged(n, o) {
    // Defer the refresh so input masking doesn't barf
    if (!this.isAttached) {
      this.deferredRefresh = () => {
        this.formGroups.forEach(fg => {
          fg.model = this.model;
          fg.value = this.model[fg.for];
        });
      }
    } else {
      this.formGroups.forEach(fg => {
        fg.model = this.model;
        fg.value = this.model[fg.for];
      });
    }
  }

  attached() {
    this.isAttached = true;

    if (this.deferredRefresh) {
      this.deferredRefresh();
    }
  }
}
