import React, { createContext, useContext, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface TaskList {
  id: string;
  title: string;
  color?: string;
  tasks: Task[];
}

interface BoardContextData {
  lists: TaskList[];

  addList: (title: string, color: string) => void;
  editList: (listId: string, title: string, color: string) => void;
  deleteList: (listId: string) => void;

  addTask: (listId: string, title: string, description: string) => void;
  editTask: (
    taskId: string,
    title: string,
    description: string,
    targetListId: string,
  ) => void;
  deleteTask: (taskId: string, listId: string) => void;
  toggleTask: (taskId: string, listId: string) => void;
}

const BoardContext = createContext<BoardContextData>({} as BoardContextData);

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useState<TaskList[]>([]);

  const addList = (title: string, color: string) => {
    const newList: TaskList = {
      id: `list-${Date.now()}`,
      title,
      color,
      tasks: [],
    };
    setLists((prev) => [...prev, newList]);
  };

  const editList = (listId: string, title: string, color: string) => {
    setLists((prev) =>
      prev.map((l) => (l.id === listId ? { ...l, title, color } : l)),
    );
  };

  const deleteList = (listId: string) => {
    setLists((prev) => prev.filter((l) => l.id !== listId));
  };

  const addTask = (listId: string, title: string, description: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      completed: false,
    };
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId ? { ...l, tasks: [...l.tasks, newTask] } : l,
      ),
    );
  };

  const editTask = (taskId: string, title: string, description: string) => {
    setLists((prev) =>
      prev.map((l) => ({
        ...l,
        tasks: l.tasks.map((t) =>
          t.id === taskId ? { ...t, title, description } : t,
        ),
      })),
    );
  };

  const deleteTask = (taskId: string, listId: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, tasks: l.tasks.filter((t) => t.id !== taskId) }
          : l,
      ),
    );
  };

  const toggleTask = (taskId: string, listId: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              tasks: l.tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t,
              ),
            }
          : l,
      ),
    );
  };

  return (
    <BoardContext.Provider
      value={{
        lists,
        addList,
        editList,
        deleteList,
        addTask,
        editTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
}
