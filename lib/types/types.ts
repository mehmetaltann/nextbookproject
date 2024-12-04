export type Book = {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  yayinevi: string;
  sayfaSayisi: string;
  tur: string;
  kategori: string[];
  yayinTarihi: string;
  alinmaTarihi: string;
  okunmaTarihi: string;
  alinmaYeri: string;
  coverImage: string;
  durum: string;
};

export type BookWithoutId = {
  title: string;
  author: string;
  isbn: string;
  yayinevi: string;
  sayfaSayisi: string;
  tur: string;
  kategori: string[];
  yayinTarihi: string;
  alinmaTarihi: string;
  okunmaTarihi: string;
  alinmaYeri: string;
  coverImage: string;
  durum: string;
};

export type BookClassy = {
  _id: string;
  type: string;
  categories: { name: string }[];
};

export type BookClassyWithoutId = {
  type: string;
  categories: { name: string }[];
};

export type Category = {
  name: string;
};
