import mongoose, { Model, Schema } from "mongoose";
import { Book } from "../types/types";

const BookSchema = new Schema<Book>({
  title: String,
  author: String,
  isbn: String,
  yayinevi: String,
  sayfaSayisi: String,
  tur: String,
  kategori: [String],
  yayinTarihi: String,
  alinmaTarihi: String,
  okunmaTarihi: String,
  alinmaYeri: String,
  coverImage: String,
  durum: String,
  notlar: String,
});

const BookModel: Model<Book> =
  mongoose.models?.book || mongoose.model<Book>("book", BookSchema);

export default BookModel;
