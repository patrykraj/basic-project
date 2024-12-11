import { Component, Input } from "@angular/core";

@Component({
  selector: "TaskEditFieldComponent",
  imports: [],
  template: `
    <textarea class="rounded-md" [placeholder]="value" [value]="value"></textarea>
  `,
  styles: ``,
})
export class TaskEditFieldComponent {
  @Input() placeholder = "";
  @Input() value = "";
}
