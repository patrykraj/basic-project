import { Task } from "../types/Task";
import { ListFetchingError } from "../types/ListStatusTypes";
import wait from "../utils/wait";
import { Injectable } from "@angular/core";

const URL: string = "http://localhost:3000";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private readonly URL = "http://localhost:3000";

  async getAll(): Promise<Task[] | ListFetchingError> {
    try {
      const response = await fetch(`${this.URL}/tasks`, { method: "GET" });

      if (!response.ok) {
        throw new Error("Nie udało się pobrać danych");
      }

      const data: Task[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error instanceof Error) {
        return { status: 404, message: error.message };
      } else {
        return { status: 404, message: "Wystąpił nieoczekiwany błąd" };
      }
    }
  }

  async add(description: string): Promise<Task | ListFetchingError> {
    await wait();

    return await fetch(`${URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdDate: new Date().getUTCDate(),
        description: description,
        done: false,
      } as Omit<Task, "id">),
    }).then<Task | ListFetchingError>((response) => {
      if (response.ok) {
        return response.json();
      }

      return { status: 404, message: "Nie można dodać zadania" };
    });
  }

  async delete(id: number): Promise<Task[] | ListFetchingError> {
    return await fetch(`${URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) return response.json();

      return { status: 400, message: "Nie udało się usunąć zadania" };
    });
  }

  async update(id: number, description: string) {
    return await fetch(`${URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    }).then((response) => {
      if (response.ok) response.json();

      return { status: 400, message: "Nie udało się zaktualizować zadania" };
    });
  }
}

export default TaskService;
