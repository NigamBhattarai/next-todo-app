import dbConnect from "@/db";
import mongoose from "mongoose";

// Import the schema and get the model after connection
async function getTodoModel() {
  await dbConnect();

  // Define the interface here to avoid circular imports
  interface ITodo extends mongoose.Document {
    title: string;
    description?: string;
    completed: boolean;
    priority: "High Priority" | "Medium Priority" | "Low Priority";
    dueDate?: Date;
    completionDate?: Date;
    createdAt: Date;
    updatedAt: Date;
  }

  // Define the schema
  const TodoSchema = new mongoose.Schema<ITodo>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
        default: "",
      },
      completed: {
        type: Boolean,
        default: false,
      },
      priority: {
        type: String,
        enum: ["High Priority", "Medium Priority", "Low Priority"],
        default: "Medium Priority",
      },
      dueDate: {
        type: Date,
        default: null,
      },
      completionDate: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
      collection: "todos",
    }
  );

  // Return existing model or create new one
  return mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);
}

// Add ITodo type export
export type ITodo = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "High Priority" | "Medium Priority" | "Low Priority";
  dueDate?: Date;
  completionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export async function getAllTodos(): Promise<any[]> {
  const Todo = await getTodoModel();
  return Todo.find({}).sort({ createdAt: -1 }).lean();
}

export async function getTodoById(id: string): Promise<any | null> {
  try {
    const Todo = await getTodoModel();

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid ObjectId format:", id);
      return null;
    }

    const todo = await Todo.findById(id).lean().exec();
    console.log("Found todo:", todo);
    return todo;
  } catch (error) {
    console.error("Error getting todo by ID:", error);
    return null;
  }
}

export async function createTodo(todoData: {
  title: string;
  description?: string;
  priority?: "High Priority" | "Medium Priority" | "Low Priority";
  dueDate?: Date;
}): Promise<any> {
  const Todo = await getTodoModel();
  return Todo.create(todoData);
}

export async function updateTodo(
  id: string,
  updateData: Partial<any>
): Promise<any | null> {
  const Todo = await getTodoModel();
  return Todo.findByIdAndUpdate(id, updateData, { new: true }).lean();
}

export async function deleteTodo(id: string): Promise<boolean> {
  const Todo = await getTodoModel();
  const result = await Todo.findByIdAndDelete(id);
  return !!result;
}

export async function toggleTodo(id: string): Promise<any | null> {
  const Todo = await getTodoModel();
  const todo = await Todo.findById(id);
  if (!todo) return null;

  todo.completed = !todo.completed;

  // Set completion date when marking as completed
  if (todo.completed && !todo.completionDate) {
    todo.completionDate = new Date();
  } else if (!todo.completed) {
    todo.completionDate = null;
  }

  return todo.save();
}
