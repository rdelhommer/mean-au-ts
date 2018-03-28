import { customElement, bindable, isInitialized, TaskQueue } from "aurelia-framework";
// import * as $ from 'jquery';
import { Utilities } from "mean-au-ts-shared";
import { IEnv } from "config/env.config";
import { TooltipOption } from "bootstrap";

@customElement('help-tooltip')
export class HelpTooltip {
  content: string

  id: string = Utilities.newGuid()

  private popperOptions: TooltipOption;

  constructor(
    private taskQueue: TaskQueue
  ) { }

  bind() {
  }

  attached() {
    this.content = $('#tooltip-content')[0].innerHTML.replace('<!--slot-->', '').trim();

    // Doing this directly in the attached function fails for some reason
    this.taskQueue.queueMicroTask(() => {
      $(`#${this.id}`).tooltip(this.popperOptions);
    })
  }
}
