import { Task } from "../types/Task";
import { ListFetchingError } from "../types/ListStatusTypes";

const URL: string = "http://localhost:3000";

export async function addTask(description: string) {
  return fetch(`${URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      createdDate: new Date().getUTCDate(),
      description: description,
      done: false,
    } as Omit<Task, "id">),
  }).then<Task | Error>((response) => {
    if (response.ok) {
      return response.json();
    }

    return new Error("Nie można dodać zadania");
  });
}

async function fetchTasks(): Promise<Task[] | ListFetchingError> {
  try {
    const response = await fetch(`${URL}/tasks`, { method: "GET" });

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

export const taskServices = {
  addTask,
  fetchTasks,
};
