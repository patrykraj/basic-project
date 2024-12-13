import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "TaskEditFieldComponent",
  imports: [],
  template: `
    <textarea
      #textArea
      class="rounded-md"
      [placeholder]="value"
      [value]="value"
      (keyup.enter)="submitUpdate.emit(textArea.value)"
    ></textarea>
  `,
  styles: ``,
})
export class TaskEditFieldComponent {
  @Input() placeholder = "";
  @Input() value = "";

  @Output() submitUpdate = new EventEmitter<string>();
}
