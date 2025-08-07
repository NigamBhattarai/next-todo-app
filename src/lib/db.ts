import dbConnect from "@/db";
import { Todo, ITodo } from "@/db/schema";

export async function getAllTodos(): Promise<ITodo[]> {
  await dbConnect();
  return Todo.find({}).sort({ createdAt: -1 }).lean();
}

export async function getTodoById(id: string): Promise<ITodo | null> {
  await dbConnect();
  return Todo.findById(id).lean();
}

export async function createTodo(todoData: {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: Date;
}): Promise<ITodo> {
  await dbConnect();
  return Todo.create(todoData);
}

export async function updateTodo(
  id: string,
  updateData: Partial<ITodo>
): Promise<ITodo | null> {
  await dbConnect();
  return Todo.findByIdAndUpdate(id, updateData, { new: true }).lean();
}

export async function deleteTodo(id: string): Promise<boolean> {
  await dbConnect();
  const result = await Todo.findByIdAndDelete(id);
  return !!result;
}

export async function toggleTodo(id: string): Promise<ITodo | null> {
  await dbConnect();
  const todo = await Todo.findById(id);
  if (!todo) return null;

  todo.completed = !todo.completed;
  return todo.save();
}
