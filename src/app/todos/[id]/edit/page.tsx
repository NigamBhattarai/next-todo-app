import { getTodoById } from "@/lib/db";
import { notFound } from "next/navigation";
import { updateTodoAction } from "@/app/actions/updateTodo";

interface Props {
  params: {
    id: string;
  };
}

async function delay() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

async function fetchTodo(id: string) {
  try {
    const todo = await getTodoById(id);

    if (!todo) {
      console.error(`Todo with ID ${id} not found`);
      notFound();
    }

    await delay();

    return todo;
  } catch (error) {
    console.error("Error fetching todo:", error);
    notFound();
  }
}

export default async function EditTodoPage({ params }: Props) {
  const todoData = await fetchTodo(params.id);

  // Convert the todo data to a serializable format
  const todo = {
    ...todoData,
    _id: todoData._id.toString(),
    dueDate: todoData.dueDate ? new Date(todoData.dueDate).toISOString().slice(0, 16) : "",
    completionDate: todoData.completionDate ? new Date(todoData.completionDate) : null,
    createdAt: new Date(todoData.createdAt),
    updatedAt: new Date(todoData.updatedAt),
  };

  return (
    <main className="max-w-4xl mx-auto mt-4 px-4">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center gap-8 max-w-lg w-full">
          <h1 className="text-6xl font-extrabold text-slate-300">
            Edit <span className="text-slate-100">Task</span>
          </h1>

          <form action={updateTodoAction} className="flex flex-col gap-4 w-full">
            <input type="hidden" name="id" value={todo._id} />
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={todo.title}
                required
                placeholder="Enter task title..."
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={todo.description || ""}
                rows={3}
                placeholder="Enter task description..."
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-2">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                defaultValue={todo.priority}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Low Priority">Low Priority</option>
                <option value="Medium Priority">Medium Priority</option>
                <option value="High Priority">High Priority</option>
              </select>
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-slate-300 mb-2">
                Deadline
              </label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                defaultValue={todo.dueDate}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-400 mt-1">
                When do you plan to complete this task?
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-blue-500 hover:bg-blue-400 transition-colors text-white rounded-xl font-semibold font-heading"
              >
                Update Task
              </button>
              
              <a
                href={`/todos/${todo._id}`}
                className="flex-1 py-3 px-6 bg-slate-600 hover:bg-slate-500 transition-colors text-white rounded-xl font-semibold font-heading text-center"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
