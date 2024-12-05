import mongoose, { Model, Schema } from "mongoose";
import { BookClassy } from "../types/types";

const BookClassySchema = new Schema<BookClassy>({
  type: String,
  categories: [
    {
      name: String,
    },
  ],
});

const BookClassyModel: Model<BookClassy> =
  mongoose.models.bookclassy ||
  mongoose.model<BookClassy>("bookclassy", BookClassySchema);

export default BookClassyModel;
