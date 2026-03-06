import type { Task } from "@/interfaces/task";
import type { TaskList } from "@/interfaces/TaskList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "@lumina:board";

interface BoardContextData {
  lists: TaskList[];
  isLoaded: boolean;

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

async function saveLists(lists: TaskList[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [lists, setLists] = useState<TaskList[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setLists(JSON.parse(stored));
      } catch (e) {
        console.warn("Erro ao carregar listas:", e);
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveLists(lists).catch((e) => console.warn("Erro ao salvar listas:", e));
    }
  }, [lists, isLoaded]);

  const addList = useCallback((title: string, color: string) => {
    const newList: TaskList = {
      id: `list-${Date.now()}`,
      title,
      color,
      tasks: [],
    };
    setLists((prev) => [...prev, newList]);
  }, []);

  const editList = useCallback(
    (listId: string, title: string, color: string) => {
      setLists((prev) =>
        prev.map((l) => (l.id === listId ? { ...l, title, color } : l)),
      );
    },
    [],
  );

  const deleteList = useCallback((listId: string) => {
    setLists((prev) => prev.filter((l) => l.id !== listId));
  }, []);

  const addTask = useCallback(
    (listId: string, title: string, description: string) => {
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
    },
    [],
  );

  const editTask = useCallback(
    (
      taskId: string,
      title: string,
      description: string,
      targetListId: string,
    ) => {
      setLists((prev) =>
        prev.map((l) => ({
          ...l,
          tasks: l.tasks.map((t) =>
            t.id === taskId ? { ...t, title, description } : t,
          ),
        })),
      );
    },
    [],
  );

  const deleteTask = useCallback((taskId: string, listId: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, tasks: l.tasks.filter((t) => t.id !== taskId) }
          : l,
      ),
    );
  }, []);

  const toggleTask = useCallback((taskId: string, listId: string) => {
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
  }, []);

  return (
    <BoardContext.Provider
      value={{
        lists,
        isLoaded,
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
  if (!context) throw new Error("useBoard must be used within a BoardProvider");
  return context;
}
