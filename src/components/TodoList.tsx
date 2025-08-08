"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoFilter, { FilterType } from "./TodoFilter";

interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "High Priority" | "Medium Priority" | "Low Priority";
  dueDate?: Date | null;
  completionDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Filter todos based on active filter
  const getFilteredTodos = () => {
    switch (activeFilter) {
      case "high":
        return todos.filter((todo) => todo.priority === "High Priority");
      case "medium":
        return todos.filter((todo) => todo.priority === "Medium Priority");
      case "low":
        return todos.filter((todo) => todo.priority === "Low Priority");
      case "overdue":
        return todos.filter(
          (todo) =>
            !todo.completed &&
            todo.dueDate &&
            new Date(todo.dueDate) < new Date()
        );
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  // Calculate stats for filtered todos
  const completedTodos = filteredTodos.filter((todo) => todo.completed);
  const pendingTodos = filteredTodos.filter((todo) => !todo.completed);
  const highPriorityTodos = filteredTodos.filter(
    (todo) => todo.priority === "High Priority"
  );
  const overdueTodos = filteredTodos.filter(
    (todo) =>
      !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Filter Component */}
      <div className="bg-slate-800/50 rounded-xl p-4">
        <h3 className="text-slate-300 font-semibold mb-3 text-center">
          Filter Tasks
        </h3>
        <TodoFilter
          onFilterChange={setActiveFilter}
          activeFilter={activeFilter}
        />
      </div>

      {/* Filtered Stats */}
      <div className="text-center">
        <p className="text-slate-400 text-sm">
          {filteredTodos.length} tasks • {pendingTodos.length} pending •{" "}
          {completedTodos.length} completed
          {overdueTodos.length > 0 && (
            <span className="text-red-400">
              {" "}
              • {overdueTodos.length} overdue
            </span>
          )}
        </p>
      </div>

      {/* High Priority Alert for filtered results */}
      {activeFilter === "all" && highPriorityTodos.length > 0 && (
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4">
          <h3 className="text-orange-400 font-semibold mb-2">
            ⚠️ High Priority Tasks ({highPriorityTodos.length})
          </h3>
          <div className="space-y-2">
            {highPriorityTodos.slice(0, 3).map((todo) => (
              <div key={todo._id} className="text-sm text-slate-300">
                • {todo.title}
              </div>
            ))}
            {highPriorityTodos.length > 3 && (
              <div className="text-sm text-slate-400">
                +{highPriorityTodos.length - 3} more high priority tasks
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 mb-4">
              {activeFilter === "all"
                ? "No tasks yet. Create your first task!"
                : `No ${activeFilter} tasks found.`}
            </p>
            {activeFilter === "all" && (
              <a
                href="/todos/create"
                className="inline-block py-2 px-4 bg-slate-700 text-slate-300 hover:bg-slate-600 rounded-lg transition-colors"
              >
                Create Task
              </a>
            )}
          </div>
        ) : (
          filteredTodos.map((todo) => <TodoItem {...todo} key={todo._id} />)
        )}
      </div>
    </div>
  );
};

export default TodoList;
