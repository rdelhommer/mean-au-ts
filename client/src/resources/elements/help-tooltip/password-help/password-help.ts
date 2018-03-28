import { inlineView, customElement } from "aurelia-framework";

@inlineView(
  '<template>' +
    '<help-tooltip>' +
      '<h6>Password Requirements:</h6>' +
      '<i class="fa fa-caret-right mr-1"></i>' +
      'At least <u>8 characters long</u><br>' +
      '<i class="fa fa-caret-right mr-1"></i>' +
      'Contains at least <u>1 number</u><br>' +
      '<i class="fa fa-caret-right mr-1"></i>' +
      'Contains at least <u>1 symbol</u>' +
    '</help-tooltip>' +
  '</template>')
@customElement('password-help')
export class PasswordHelp {

}
