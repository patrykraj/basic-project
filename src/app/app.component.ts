import { Component } from "@angular/core";
import { TaskListPageComponent } from "./pages/task-list.page.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TaskListPageComponent],
  template: `
    <h1 class="text-orange-500 bg-black text-center py-4">{{ title }}</h1>

    <main>
      <TaskListPageComponent />
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = "ToDo lista w Angularze 19";
}
