// Todo type definitions for JSX version
export const createTodo = (text) => ({
  id: crypto.randomUUID(),
  text,
  completed: false,
  createdAt: new Date(),
});