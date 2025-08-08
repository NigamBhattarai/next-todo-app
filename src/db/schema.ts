import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  priority: "High Priority" | "Medium Priority" | "Low Priority";
  dueDate?: Date;
  completionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
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

// Create or get the Todo model
export const Todo =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);

export type TodoType = ITodo;
