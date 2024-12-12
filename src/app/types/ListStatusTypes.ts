import { Task } from "./Task";

export type ListFetchingError = { status: number; message: string };

// idle - initial
export type IdleState = {
  state: "idle";
};

// loading
export type LoadingState = {
  state: "loading";
};

// success
export type SuccessState = {
  state: "success";
  results: Task[];
};

// error
export type ErrorState = {
  state: "error";
  error: ListFetchingError;
};

export type ComponentListState = IdleState | LoadingState | SuccessState | ErrorState;
