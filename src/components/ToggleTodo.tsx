import { toggleTodo } from "@/lib/db";
import { ITodo } from "@/db/schema";
import { redirect } from "next/navigation";

async function toggleTodoAction(data: FormData) {
  "use server";

  const id = data.get("id") as string;
  await toggleTodo(id);

  redirect("/todos");
}

interface ToggleTodoProps {
  _id: string;
  completed: boolean;
}

export default async function ToggleTodo({ _id, completed }: ToggleTodoProps) {
  return (
    <form action={toggleTodoAction} className="w-full">
      <button
        name="id"
        value={_id}
        type="submit"
        className="py-3 px-6 bg-slate-300 hover:bg-slate-200 transition-colors text-slate-900 rounded-xl font-semibold font-heading w-full"
      >
        {completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </form>
  );
}
