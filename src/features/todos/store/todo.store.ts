import { create } from "zustand";
import { TodoStore } from "../types/todo.types";

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [
        {
            id: crypto.randomUUID(),
            title: "Learn Zustand",
            completed: false,
        },
    ],

    addTodo: (title) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: crypto.randomUUID(),
                    title,
                    completed: false,
                },
            ],
        })),

    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        })),

    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),
}));
