"use server";

import { deleteTodo } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTodoAction(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Todo ID is required");
  }

  const result = await deleteTodo(id);

  if (!result) {
    throw new Error("Failed to delete todo");
  }

  // Revalidate the todos page to refresh the list
  revalidatePath("/todos");

  // Redirect to todos page after successful deletion
  redirect("/todos");
}
