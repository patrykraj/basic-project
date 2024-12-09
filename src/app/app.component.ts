import { Component } from "@angular/core";
import { TaskListPageComponent } from "./pages/task-list.page.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TaskListPageComponent],
  template: `
    <h1 class="text-orange-500 uppercase py-4 text-2xl text-center">{{ title }}</h1>

    <main class="grid place-items-center pt-4">
      <TaskListPageComponent />
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = "ToDo lista w Angularze 19";
}
