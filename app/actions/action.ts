"use server";
import dbConnect from "@/lib/db/dbConnect";
import BookClassyModel from "@/lib/models/BookClassification";
import BookModel from "@/lib/models/BookModel";
import { Book, BookClassy, BookWithoutId } from "@/lib/types/types";
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

export const fetchBookClassy = async () => {
  try {
    await dbConnect();
    const bookClassies = await BookClassyModel.find({});
    const filteredAllItems: BookClassy[] = JSON.parse(
      JSON.stringify(bookClassies)
    );
    return filteredAllItems as BookClassy[];
  } catch (error) {
    console.error("Kitap türleri alınırken bir hata oluştu:", error);
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

export const addNewType = async (newType: string) => {
  try {
    const existingType = await BookClassyModel.findOne({ type: newType });
    if (existingType) {
      console.log(`${newType} türü zaten mevcut.`);
      return { status: false, msg: `${newType} türü zaten mevcut.` };
    }
    const newBookClassy = new BookClassyModel({
      type: newType,
      categories: [],
    });
    await newBookClassy.save();
    revalidatePath("/parameters");
    revalidatePath("/");
    return { status: true, msg: `${newType} türü başarıyla eklendi.` };
  } catch (error) {
    console.error("Yeni tür ekleme işlemi sırasında bir hata oluştu:", error);
    return {
      status: false,
      msg: "Yeni tür ekleme işlemi sırasında bir hata oluştu.",
    };
  }
};

export const addCategoryToType = async (type: string, newCategory: string) => {
  try {
    const bookClassy = await BookClassyModel.findOne({ type });
    if (!bookClassy) {
      console.log(`${type} türü bulunamadı.`);
      return { status: false, msg: `${type} türü bulunamadı.` };
    }
    const categoryExists = bookClassy.categories.some(
      (category) => category.name === newCategory
    );
    if (categoryExists) {
      console.log(`${newCategory} kategorisi zaten mevcut.`);
      return { status: false, msg: `${newCategory} kategorisi zaten mevcut.` };
    }
    bookClassy.categories.push({ name: newCategory });
    await bookClassy.save();
    revalidatePath("/parameters");
    revalidatePath("/");
    console.log(`${newCategory} kategorisi başarıyla eklendi.`);
    return {
      status: true,
      msg: `${newCategory} kategorisi başarıyla eklendi.`,
    };
  } catch (error) {
    console.error("Kategori ekleme işlemi sırasında bir hata oluştu:", error);
    return {
      status: false,
      msg: "Kategori ekleme işlemi sırasında bir hata oluştu.",
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
    revalidatePath("/parameters");
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

export const deleteType = async (bookClassyID: string): Promise<Response> => {
  try {
    await dbConnect();
    await BookClassyModel.findByIdAndDelete(bookClassyID);
    revalidatePath(`/parameters`);
    revalidatePath("/");
    return { msg: "Tür başarıyla silindi", status: true };
  } catch (error) {
    console.error(`Silme hatası: ${error}`);
    return {
      msg: `Tür silinemedi: ${error instanceof Error ? error.message : error}`,
      status: false,
    };
  }
};

export const deleteCategory = async (type: string, categoryName: string) => {
  try {
    const bookClassy = await BookClassyModel.findOne({ type });

    if (!bookClassy) {
      return { status: false, msg: `${type} türü bulunamadı.` };
    }
    const updatedCategories = bookClassy.categories.filter(
      (category) => category.name !== categoryName
    );

    if (updatedCategories.length === bookClassy.categories.length) {
      return { status: false, msg: `${categoryName} kategorisi bulunamadı.` };
    }

    bookClassy.categories = updatedCategories;
    await bookClassy.save();
    revalidatePath("/parameters");
    revalidatePath("/");
    return {
      status: true,
      msg: `${categoryName} kategorisi başarıyla silindi.`,
    };
  } catch (error) {
    console.error("Kategori silme işlemi sırasında bir hata oluştu:", error);
    return {
      status: false,
      msg: "Kategori silme işlemi sırasında bir hata oluştu.",
    };
  }
};
