import mongoose, { Model, Schema } from "mongoose";
import { BookClassy } from "../types/types";

const BookClassySchema = new Schema<BookClassy>({
  type: { type: String, required: true },
  categories: [
    {
      name: { type: String, required: true },
    },
  ],
});

const BookClassyModel: Model<BookClassy> =
  mongoose.models.bookclassy ||
  mongoose.model<BookClassy>("bookclassy", BookClassySchema);

export default BookClassyModel;
