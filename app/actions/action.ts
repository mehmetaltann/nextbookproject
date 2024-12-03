"use server";
import dbConnect from "@/lib/db/dbConnect";
import BookModel from "@/lib/models/BookModel";
import { Book, BookWithoutId } from "@/lib/types/types";
import { revalidatePath } from "next/cache";

interface Response {
  msg: string;
  status: boolean;
}

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    await dbConnect();
    const allBooks = await BookModel.find({}).lean();
    const filteredAllItems: Book[] = JSON.parse(JSON.stringify(allBooks));
    return filteredAllItems as Book[];
  } catch (error) {
    console.error(`Error fetching from model`, error);
    return [];
  }
};

export const addBooks = async (formData: BookWithoutId): Promise<Response> => {
  const { isbn } = formData;
  try {
    await dbConnect();
    const book = await BookModel.findOne(
      {
        isbn,
      },
      { _id: 0 }
    );
    if (book) {
      return { msg: "Bu Kitap Zaten Kayıtlıdır", status: false };
    } else {
      await BookModel.create(formData);
    }
    revalidatePath("/");
    return { msg: "Kitap Eklendi", status: true };
  } catch (error) {
    return {
      msg: `Kitap Eklenemedi: ${
        error instanceof Error ? error.message : error
      }`,
      status: false,
    };
  }
};

export const updateBook = async (
  bookId: string,
  formData: any
): Promise<Response> => {
  try {
    await dbConnect();
    await BookModel.updateOne({ _id: bookId }, { $set: formData });
    revalidatePath(`/`);
    return { msg: "Kitap başarıyla güncellendi", status: true };
  } catch (error) {
    return {
      msg: `Kitap güncellenemedi: ${
        error instanceof Error ? error.message : error
      }`,
      status: false,
    };
  }
};

export const deleteBook = async (bookId: string): Promise<Response> => {
  try {
    await dbConnect();
    await BookModel.findByIdAndDelete(bookId);
    revalidatePath(`/`);
    return { msg: "Kitap başarıyla silindi", status: true };
  } catch (error) {
    console.error(`Silme hatası: ${error}`);
    return {
      msg: `Kitap silinemedi: ${
        error instanceof Error ? error.message : error
      }`,
      status: false,
    };
  }
};
