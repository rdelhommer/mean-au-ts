import { customElement, bindable, containerless, noView } from "aurelia-framework";

@customElement('side-nav-item')
export class SideNavItem {
  @bindable title: string
  @bindable icon?: string
  @bindable href: string
}