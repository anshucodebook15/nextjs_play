"use client";
import { todoService } from "../services/todo.service";
import { useTodoStore } from "../store/todo.store";

export function useTodos() {
  const todos = useTodoStore((state) => state.todos);

  return {
    todos,

    addTodo: todoService.addTodo,

    toggleTodo: todoService.toggleTodo,
  };
}
