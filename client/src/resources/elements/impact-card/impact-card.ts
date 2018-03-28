import { customElement, bindable } from "aurelia-framework";

@customElement('impact-card')
export class ImpactCard {
  @bindable heading: string
  @bindable icon: string
  @bindable href: string
}