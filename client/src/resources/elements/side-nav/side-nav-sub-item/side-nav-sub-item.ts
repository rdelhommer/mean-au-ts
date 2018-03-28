import { customElement, bindable, containerless, noView } from "aurelia-framework";

@customElement('side-nav-sub-item')
export class SideNavSubItem {
  @bindable title: string
  @bindable href: string
  @bindable action: () => void
}