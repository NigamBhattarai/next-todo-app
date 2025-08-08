"use client";

import { useState, useTransition } from "react";
import { toggleTodo } from "@/lib/db";

export default function ToggleTodo({
  _id,
  completed,
}: {
  _id: string;
  completed: boolean;
}) {
  const [isToggling, setIsToggling] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleToggle() {
    if (isToggling || isPending) return;

    setIsToggling(true);

    startTransition(async () => {
      await toggleTodo(_id);
      // Refresh the page to show updated state
      window.location.reload();
    });
  }

  const loading = isToggling || isPending;

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        py-3 px-6 rounded-xl font-semibold font-heading w-full transition-all duration-300
        ${
          loading
            ? "bg-slate-400 text-slate-600 scale-95 opacity-50"
            : "bg-slate-300 hover:bg-slate-200 text-slate-900 hover:scale-105"
        }
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
          Updating...
        </div>
      ) : completed ? (
        "Mark Incomplete"
      ) : (
        "Mark Complete"
      )}
    </button>
  );
}
