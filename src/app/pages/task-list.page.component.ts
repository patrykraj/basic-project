import { Component, OnInit } from "@angular/core";
import { TasksListComponent } from "../components/tasks-list.component";
import { TaskInputComponent } from "../components/task-input.component";
import { Task } from "../types/Task";
import { NgIf } from "@angular/common";

type ListFetchingError = { status: number; message: string };

// idle - initial
type IdleState = {
  state: "idle";
};
// loading
type LoadingState = {
  state: "loading";
};
// success
type SuccessState = {
  state: "success";
  results: Task[];
};
// error
type ErrorState = {
  state: "error";
  error: ListFetchingError;
};

type ComponentListState = IdleState | LoadingState | SuccessState | ErrorState;

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

  private readonly URL: string = "http://localhost:3000";

  ngDoCheck(): void {
    // console.log("ngDoCheck called. Current value:", this.listStatus);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.listStatus = { state: "loading" };
    try {
      const response = await fetch(`${this.URL}/tasks`);

      if (!response.ok) {
        throw new Error("Nie udało się pobrać danych");
      }

      const data: Task[] = await response.json();
      this.listStatus = { state: "success", results: data };
    } catch (error) {
      this.listStatus = {
        state: "error",
        error:
          error instanceof Error
            ? { status: 404, message: error.message }
            : { status: 404, message: "Wystąpił nieoczekiwany błąd" },
      };
      console.error("Error fetching data:", error);
    }
  }

  addTask(description: string, tasks: Task[]) {
    return fetch(`${this.URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdDate: new Date().getUTCDate(),
        description: description,
        done: false,
      } as unknown as Task),
    })
      .then<Task | Error>((response) => {
        if (response.ok) {
          return response.json();
        }

        return new Error("Nie można dodać zadania");
      })
      .then((res) => {
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
