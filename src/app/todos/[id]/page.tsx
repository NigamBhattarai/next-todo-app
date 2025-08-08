import DeleteTodo from "@/components/DeleteTodo";
import TodoItem from "@/components/TodoItem";
import ToggleTodo from "@/components/ToggleTodo";
import { getTodoById } from "@/lib/db";
import { notFound } from "next/navigation";
import { delay } from "@/lib/utils";

export const revalidate = 0;

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

interface Props {
  params: {
    id: string;
  };
}

export default async function TodoPage({ params }: Props) {
  const todoData = await fetchTodo(params.id);

  // Convert the todo data to a serializable format
  const todo = {
    ...todoData,
    _id: todoData._id.toString(),
    dueDate: todoData.dueDate ? new Date(todoData.dueDate) : null,
    completionDate: todoData.completionDate
      ? new Date(todoData.completionDate)
      : null,
    createdAt: new Date(todoData.createdAt),
    updatedAt: new Date(todoData.updatedAt),
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <TodoItem {...todo} />

      <div className="bg-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">Task Details</h2>

        <div className="space-y-3">
          <div>
            <span className="text-slate-400 text-sm">Description:</span>
            <p className="text-slate-200 mt-1">
              {todo.description || "No description provided"}
            </p>
          </div>

          <div>
            <span className="text-slate-400 text-sm">Priority:</span>
            <p className="text-slate-200 mt-1">{todo.priority}</p>
          </div>

          {todo.dueDate && (
            <div>
              <span className="text-slate-400 text-sm">Deadline:</span>
              <p className="text-slate-200 mt-1">{formatDate(todo.dueDate)}</p>
            </div>
          )}

          {todo.completionDate && (
            <div>
              <span className="text-slate-400 text-sm">Completion Date:</span>
              <p className="text-slate-200 mt-1">
                {formatDate(todo.completionDate)}
              </p>
            </div>
          )}

          <div>
            <span className="text-slate-400 text-sm">Created:</span>
            <p className="text-slate-200 mt-1">{formatDate(todo.createdAt)}</p>
          </div>

          <div>
            <span className="text-slate-400 text-sm">Last Updated:</span>
            <p className="text-slate-200 mt-1">{formatDate(todo.updatedAt)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <ToggleTodo {...todo} />

        <a
          href={`/todos/${todo._id}/edit`}
          className="py-3 px-6 bg-yellow-500 hover:bg-yellow-400 transition-colors text-slate-900 rounded-xl font-semibold font-heading w-full text-center"
        >
          Edit Task
        </a>

        <DeleteTodo id={todo._id} />
      </div>
    </div>
  );
}
