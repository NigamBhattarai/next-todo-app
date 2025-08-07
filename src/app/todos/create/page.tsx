import { redirect } from "next/navigation";
import { createTodo } from "@/lib/db";

export default async function CreatePage() {
  async function createTodoAction(data: FormData) {
    "use server";

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const priority = data.get("priority") as "low" | "medium" | "high";
    const dueDate = data.get("dueDate") as string;

    if (!title.trim()) {
      throw new Error("Title is required");
    }

    await createTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      priority: priority || "medium",
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    redirect("/todos");
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <h1 className="font-semibold font-heading text-xl text-center">
        Create New Task
      </h1>
      <form action={createTodoAction} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Title *
          </label>
          <input
            id="title"
            type="text"
            name="title"
            required
            className="w-full bg-transparent rounded-xl border border-slate-700 focus:border-slate-300 outline-none px-4 py-3 transition-colors"
            placeholder="Enter task title..."
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full bg-transparent rounded-xl border border-slate-700 focus:border-slate-300 outline-none px-4 py-3 transition-colors resize-none"
            placeholder="Enter task description..."
          />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="w-full bg-transparent rounded-xl border border-slate-700 focus:border-slate-300 outline-none px-4 py-3 transition-colors"
          >
            <option value="low">Low</option>
            <option value="medium" selected>
              Medium
            </option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Due Date
          </label>
          <input
            id="dueDate"
            type="datetime-local"
            name="dueDate"
            className="w-full bg-transparent rounded-xl border border-slate-700 focus:border-slate-300 outline-none px-4 py-3 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="py-3 px-6 bg-slate-300 text-slate-900 hover:bg-slate-100 rounded-xl font-semibold font-heading transition-colors"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
