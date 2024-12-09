import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "TaskInputComponent",
  imports: [],
  template: `
    <div class="mb-8">
      <input
        #textInput
        type="text"
        (keyup.enter)="submitText.emit(textInput.value); textInput.value = ''"
        class="border-b border-b-orange-400 outline-none"
      />
      <button
        type="submit"
        (click)="submitText.emit(textInput.value); textInput.value = ''"
        class="ml-5 border-orange-400 border border-spacing-x-5"
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
