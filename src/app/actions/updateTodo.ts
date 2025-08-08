"use server";

import { updateTodo } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTodoAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as "Low Priority" | "Medium Priority" | "High Priority";
  const deadline = formData.get("deadline") as string;

  if (!id || !title) {
    throw new Error("Todo ID and title are required");
  }

  const updateData: any = {
    title: title.trim(),
    description: description?.trim() || "",
    priority,
    updatedAt: new Date(),
  };

  // Only set dueDate if deadline is provided
  if (deadline) {
    updateData.dueDate = new Date(deadline);
  } else {
    updateData.dueDate = null;
  }

  const result = await updateTodo(id, updateData);

  if (!result) {
    throw new Error("Failed to update todo");
  }

  // Revalidate relevant pages
  revalidatePath("/todos");
  revalidatePath(`/todos/${id}`);

  // Redirect to the todo detail page
  redirect(`/todos/${id}`);
}
