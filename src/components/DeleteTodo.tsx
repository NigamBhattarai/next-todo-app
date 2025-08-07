import { deleteTodo } from "@/lib/db";
import { redirect } from "next/navigation";

async function deleteTodoAction(data: FormData) {
  "use server";

  const id = data.get("id") as string;
  await deleteTodo(id);

  redirect("/todos");
}

export default async function DeleteTodo({ id }: { id: string }) {
  return (
    <form action={deleteTodoAction} className="w-full">
      <button
        name="id"
        value={id}
        type="submit"
        className="py-3 px-6 bg-red-500 hover:bg-red-400 transition-colors text-white rounded-xl font-semibold font-heading w-full"
      >
        Delete Task
      </button>
    </form>
  );
}
