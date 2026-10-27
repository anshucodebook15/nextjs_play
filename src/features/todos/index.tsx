"use client";
import { useTodos } from "./hooks/use-todo";
const TodoFeature = () => {
  const { todos, addTodo, toggleTodo } = useTodos();

  console.log("Todos from store", todos);

  return <div>Lets Create a Feature For a todo App</div>;
};

export default TodoFeature;
