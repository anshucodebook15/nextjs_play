import { useTodoStore } from "../store/todo.store";

export const todoService = {
  get todos() {
    return useTodoStore.getState().todos;
  },

  addTodo(title: string) {
    useTodoStore.getState().addTodo(title);
  },

  toggleTodo(id: string) {
    useTodoStore.getState().toggleTodo(id);
  },
};
