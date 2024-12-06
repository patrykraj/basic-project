import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { TasksListComponent } from "./tasks-list/tasks-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NgFor, TasksListComponent],
  template: `
    <h1 class="text-orange-500 bg-black text-center py-4">{{ title }}</h1>

    <TasksListComponent [tasks]="tasks" />
  `,
  styles: [],
})
export class AppComponent {
  title = "ToDo lista w Angularze 19";

  tasks = [
    {
      description: "zadanie pierwsze",
      done: false,
    },
    {
      description: "zadanie drugie",
      done: true,
    },
  ];
}
