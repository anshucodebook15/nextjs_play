export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoStore {
  todos: Todo[];

  addTodo: (title: string) => void;

  toggleTodo: (id: string) => void;

  removeTodo: (id: string) => void;
}
