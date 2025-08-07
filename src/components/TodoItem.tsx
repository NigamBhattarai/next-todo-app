import { ITodo } from "@/db/schema";
import Link from "next/link";

const TodoItem = ({ title, completed, _id, priority }: ITodo) => {
  const priorityColors = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500",
  };

  return (
    <Link
      href={`/todos/${_id}`}
      className="rounded-xl flex items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 transition-colors"
    >
      <span className="text-xl">{completed ? "✅" : "⭕"}</span>
      <div className="flex-1">
        <span className={`text-slate-300 ${completed ? "line-through" : ""}`}>
          {title}
        </span>
      </div>
      <span className={`text-sm ${priorityColors[priority]}`}>{priority}</span>
    </Link>
  );
};

export default TodoItem;
