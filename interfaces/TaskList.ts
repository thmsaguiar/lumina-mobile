import type { Task } from "./Task";

export interface TaskList {
  id: string;
  title: string;
  color?: string;
  tasks: Task[];
}
