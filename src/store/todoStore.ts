import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, newText: string) => void;
  toggleDone: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: text =>
        set(state => ({
          todos: [
            ...state.todos,
            { id: Date.now().toString(), text, done: false }, // ✅ Added `done: false`
          ],
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
      toggleDone: id =>
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo,
          ),
        })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
