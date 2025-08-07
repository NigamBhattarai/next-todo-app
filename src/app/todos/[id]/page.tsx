import DeleteTodo from "@/components/DeleteTodo";
import TodoItem from "@/components/TodoItem";
import ToggleTodo from "@/components/ToggleTodo";
import { getTodoById } from "@/lib/db";
import { notFound } from "next/navigation";
import { delay } from "@/lib/utils";

export const revalidate = 0;

async function fetchTodo(id: string) {
  const todo = await getTodoById(id);

  if (!todo) {
    notFound();
  }

  await delay();

  return todo;
}

interface Props {
  params: {
    id: string;
  };
}

export default async function TodoPage({ params }: Props) {
  const todo = await fetchTodo(params.id);

  return (
    <div className="flex flex-col gap-4">
      <TodoItem {...todo} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* @ts-expect-error Server Component */}
        <ToggleTodo {...todo} />

        {/* @ts-expect-error Server Component */}
        <DeleteTodo id={todo._id} />
      </div>
    </div>
  );
}
