import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "TaskInputComponent",
  imports: [],
  template: `
    <div>
      <input
        #textInput
        type="text"
        (keyup.enter)="submitText.emit(textInput.value); textInput.value = ''"
        class="border-b border-b-orange-400 outline-none"
      />
      <button
        type="submit"
        (click)="submitText.emit(textInput.value); textInput.value = ''"
      >
        Add
      </button>
    </div>
  `,
  styles: [
    `
      input:focus + button {
        @apply text-orange-400;
      }
    `,
  ],
})
export class TaskInputComponent {
  @Output() submitText = new EventEmitter<string>();
}
