import TodoList from "@/components/TodoList";
import { getAllTodos } from "@/lib/db";
import { delay } from "@/lib/utils";
import Link from "next/link";

export const revalidate = 0;

async function fetchTodos() {
  await delay();
  return getAllTodos();
}

export default async function TodosPage() {
  const todosData = await fetchTodos();

  // Convert ObjectIds to strings for client components
  const todos = todosData.map((todo) => ({
    ...todo,
    _id: todo._id.toString(),
    dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
    completionDate: todo.completionDate ? new Date(todo.completionDate) : null,
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt),
  }));

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const highPriorityTodos = todos.filter(
    (todo) => todo.priority === "High Priority"
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="font-semibold font-heading text-2xl mb-2">Your Tasks</h1>
        <p className="text-slate-400 text-sm">
          {todos.length} total tasks • {pendingTodos.length} pending •{" "}
          {completedTodos.length} completed
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-slate-200">
            {todos.length}
          </div>
          <div className="text-sm text-slate-400">Total Tasks</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {pendingTodos.length}
          </div>
          <div className="text-sm text-slate-400">Pending</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-500">
            {completedTodos.length}
          </div>
          <div className="text-sm text-slate-400">Completed</div>
        </div>
      </div>

      {/* Create New Task Button */}
      <div className="text-center">
        <Link
          href="/todos/create"
          className="inline-block py-3 px-6 bg-slate-300 text-slate-900 hover:bg-slate-100 rounded-xl font-semibold font-heading transition-colors"
        >
          + Create New Task
        </Link>
      </div>

      {/* TodoList with Filtering */}
      <TodoList todos={todos} />
    </div>
  );
}
