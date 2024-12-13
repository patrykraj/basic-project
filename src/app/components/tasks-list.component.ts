import { NgFor, CommonModule, NgIf } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Task } from "../types/Task";
import { TaskRemoveButtonComponent } from "./task-remove-button.component";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherCalendar } from "@ng-icons/feather-icons";
import { TaskEditFieldComponent } from "./task-edit-field.component";
import TaskService from "../services/tasks.service";

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
              (submitUpdate)="handleUpdateTask($event, task.id)"
            />
            <ng-template class="text-left" #previewModeTemplate>
              {{ task.description }}
            </ng-template>
            <footer class="flex justify-end">
              <TaskRemoveButtonComponent (deleteTask)="handleDeleteTask(task.id)" />
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

  private TaskService = inject(TaskService);

  handleDeleteTask(id: number) {
    this.TaskService.delete(id).then((res) => {
      console.log(res, "RESPONS Z DILITA");
    });
  }

  handleUpdateTask(description: string, id: number) {
    this.TaskService.update(id, description).then((res) => {
      console.log(res, "RESPONS Z APDEJTA");
    });
  }

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
