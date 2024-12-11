import { NgFor, CommonModule, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Task } from "../types/Task";
import { TaskRemoveButtonComponent } from "./task-remove-button.component";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherCalendar } from "@ng-icons/feather-icons";
import { TaskEditFieldComponent } from "./task-edit-field.component";

@Component({
  selector: "TasksListComponent",
  imports: [
    NgFor,
    CommonModule,
    TaskRemoveButtonComponent,
    NgIconComponent,
    TaskEditFieldComponent,
    NgIf,
  ],
  viewProviders: [provideIcons({ featherCalendar })],
  template: `
    <ul>
      <li *ngFor="let task of tasks; let i = index" class="mb-2">
        <div
          class="py-5 px-5 shadow-md rounded-md"
          [class.bg-green-300]="task.done"
          (click)="toggleTaskStatus(task)"
          (dblclick)="setEditTaskMode(task.id)"
        >
          <button class="w-full">
            <header class="flex justify-end">
              <ng-icon name="featherCalendar" />
            </header>
            <TaskEditFieldComponent
              *ngIf="isEditMode == task.id; else previewModeTemplate"
              [value]="task.description"
              (keyup.escape)="isEditMode = null"
            />
            <ng-template class="text-left" #previewModeTemplate>
              {{ task.description }}
            </ng-template>
            <footer class="flex justify-end">
              <TaskRemoveButtonComponent />
            </footer>
          </button>
        </div>
      </li>
    </ul>
  `,
  styles: ``,
})
export class TasksListComponent {
  @Input() tasks: Task[] = [];

  isEditMode: number | null = null;

  isSingleClick = true;

  handleSingleClick(task: Task) {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
        this.toggleTaskStatus(task);
      }
    }, 150);
  }

  toggleTaskStatus(task: Task) {
    task.done = !task.done;
  }

  setEditTaskMode(id: number) {
    this.isSingleClick = false;
    if (this.isEditMode) this.isEditMode = null;
    else this.isEditMode = id;
  }
}
