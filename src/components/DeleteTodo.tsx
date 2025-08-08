"use client";

import { useState, useTransition } from "react";
import { deleteTodoAction } from "@/app/actions/deleteTodo";

export default function DeleteTodo({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (isDeleting || isPending) return;

    setIsDeleting(true);

    // Use startTransition to handle the server action properly
    startTransition(async () => {
      // Add a small delay to show the animation before deletion
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create a form data object and call the server action
      const formData = new FormData();
      formData.append("id", id);

      await deleteTodoAction(formData);
    });
  }

  const loading = isDeleting || isPending;

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`
        py-3 px-6 rounded-xl font-semibold font-heading w-full transition-all duration-300
        ${
          loading
            ? "bg-red-600 text-white scale-95 opacity-50"
            : "bg-red-500 hover:bg-red-400 text-white hover:scale-105"
        }
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Deleting...
        </div>
      ) : (
        "Delete Task"
      )}
    </button>
  );
}
