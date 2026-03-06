import type { Task } from "./task";

export interface TaskList {
  id: string;
  title: string;
  color?: string;
  tasks: Task[];
}
