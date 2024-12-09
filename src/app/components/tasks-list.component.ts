import { NgFor, CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Task } from "../types/Task";
import { TaskRemoveButtonComponent } from "./task-remove-button.component";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherCalendar } from "@ng-icons/feather-icons";

@Component({
  selector: "TasksListComponent",
  imports: [NgFor, CommonModule, TaskRemoveButtonComponent, NgIconComponent],
  viewProviders: [provideIcons({ featherCalendar })],
  template: `
    <ul>
      <li *ngFor="let task of tasks" class="mb-2">
        <div
          class="py-5 px-5 shadow-md rounded-md"
          [class.bg-green-300]="task.done"
          (click)="toggleTaskStatus(task)"
        >
          <button class="w-full">
            <header class="flex justify-end">
              <ng-icon name="featherCalendar" />
            </header>
            <div class="text-left">
              {{ task.description }}
            </div>
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

  toggleTaskStatus(task: Task) {
    task.done = !task.done;
  }
}
