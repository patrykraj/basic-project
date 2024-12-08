import { NgFor, CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Task } from "../types/Task";

@Component({
  selector: "TasksListComponent",
  imports: [NgFor, CommonModule],
  template: `
    <ul>
      <li *ngFor="let task of tasks">
        <button [class.line-through]="task.done" (click)="toggleTaskStatus(task)">
          {{ task.description }}
        </button>
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
