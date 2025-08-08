import { ITodo } from "@/db/schema";
import Link from "next/link";

interface TodoItemProps {
  title: string;
  completed: boolean;
  _id: string;
  priority: "Low Priority" | "Medium Priority" | "High Priority";
  completionDate?: Date | null;
  dueDate?: Date | null;
}

const TodoItem = ({
  title,
  completed,
  _id,
  priority,
  completionDate,
  dueDate,
}: TodoItemProps) => {
  const priorityColors = {
    "Low Priority": "text-green-500",
    "Medium Priority": "text-yellow-500",
    "High Priority": "text-red-500",
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if task is overdue
  const isOverdue = !completed && dueDate && new Date(dueDate) < new Date();

  // Determine card styling based on status
  const getCardStyling = () => {
    if (isOverdue) {
      return "border blink-red hover:bg-red-900/60";
    }
    return "bg-slate-800 hover:bg-slate-700";
  };

  return (
    <Link
      href={`/todos/${_id}`}
      className={`rounded-xl flex items-center gap-3 px-4 py-3 transition-all duration-300 ${getCardStyling()}`}
    >
      <span className="text-xl">
        {completed ? "✅" : isOverdue ? "⚠️" : "⭕"}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`text-slate-300 ${completed ? "line-through" : ""}`}>
            {title}
          </span>
          {isOverdue && (
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-medium">
              OVERDUE
            </span>
          )}
        </div>
        {completed && completionDate && (
          <div className="text-xs text-slate-400 mt-1">
            Completed: {formatDate(completionDate)}
          </div>
        )}
        {!completed && dueDate && (
          <div
            className={`text-xs mt-1 ${
              isOverdue ? "text-red-400 font-medium" : "text-slate-400"
            }`}
          >
            Deadline: {formatDate(dueDate)}
            {isOverdue && (
              <span className="ml-2 text-red-300">
                (Due{" "}
                {Math.floor(
                  (new Date().getTime() - new Date(dueDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days ago)
              </span>
            )}
          </div>
        )}
      </div>
      <span className={`text-sm ${priorityColors[priority]} font-medium`}>
        {priority}
      </span>
    </Link>
  );
};

export default TodoItem;
