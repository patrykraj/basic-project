import { Component, OnInit } from "@angular/core";
import { TasksListComponent } from "../components/tasks-list.component";
import { TaskInputComponent } from "../components/task-input.component";
import { Task } from "../types/Task";
import { NgIf } from "@angular/common";
import { taskServices } from "../services/tasks.service";
import { ComponentListState } from "../types/ListStatusTypes";

@Component({
  selector: "TaskListPageComponent",
  standalone: true,
  imports: [TasksListComponent, TaskInputComponent, NgIf],
  template: `
    <TaskInputComponent
      (submitText)="listStatus.state === 'success' && addTask($event, listStatus.results)"
    />
    <TasksListComponent
      *ngIf="listStatus.state === 'success'; else loadingTemplate"
      [tasks]="listStatus.results"
    />

    <p *ngIf="listStatus.state === 'error'">{{ listStatus.error.message }}</p>
    <ng-template #loadingTemplate>
      <p *ngIf="listStatus.state === 'loading'">Loading...</p>
    </ng-template>
  `,
  styles: [],
})
export class TaskListPageComponent implements OnInit {
  listStatus: ComponentListState = { state: "idle" };

  // ngDoCheck(): void {
  //   console.log("ngDoCheck called. Current value:", this.listStatus);
  // }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.listStatus = { state: "loading" };

    const response = await taskServices.fetchTasks();

    if (Array.isArray(response)) {
      this.listStatus = { state: "success", results: response };
    } else {
      this.listStatus = { state: "error", error: response };
    }
  }

  async addTask(description: string, tasks: Task[]) {
    taskServices.addTask(description).then((res) => {
      if ("id" in res) {
        this.listStatus = {
          state: "success",
          results: [...tasks, res],
        };
      } else {
        alert(res.message);
      }
    });
  }
}
