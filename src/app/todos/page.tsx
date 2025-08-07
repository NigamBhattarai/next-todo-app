import TodoItem from "@/components/TodoItem";
import { getAllTodos } from "@/lib/db";
import { delay } from "@/lib/utils";

export const revalidate = 0;

async function fetchTodos() {
  await delay();
  return getAllTodos();
}

export default async function TodosPage() {
  const todos = await fetchTodos();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold font-heading text-xl text-center">
        Your Tasks
      </h1>
      {todos.map((todo) => (
        <TodoItem {...todo} key={todo._id} />
      ))}
    </div>
  );
}
