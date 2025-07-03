import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  text: string;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, newText: string) => void;
  clearTodos: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    set => ({
      todos: [],
      addTodo: text =>
        set(state => ({
          todos: [...state.todos, { id: Date.now().toString(), text }],
        })),
      removeTodo: id =>
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
        })),
      updateTodo: (id, newText) =>
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo,
          ),
        })),
      clearTodos: () => set({ todos: [] }),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage), // ✅ This resolves all TypeScript issues
    },
  ),
);
