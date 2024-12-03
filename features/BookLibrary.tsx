"use client";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "./SearchBar";
import StatusDialog from "./StatusDialog";
import BookDialog from "./BookDialog";
import BookCard from "./BookCard";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Book, BookWithoutId } from "@/lib/types/types";
import { AppBar, Toolbar, Typography, Tabs, Tab, Fab } from "@mui/material";

interface BookLibraryProps {
  books: Book[];
}

const initalBookData: BookWithoutId = {
  title: "",
  author: "",
  isbn: "",
  yayinevi: "",
  sayfaSayisi: "",
  tur: "",
  kategori: "",
  yayinTarihi: dayjs().format("YYYY-MM-DD"),
  alinmaTarihi: dayjs().format("YYYY-MM-DD"),
  okunmaTarihi: dayjs().format("YYYY-MM-DD"),
  alinmaYeri: "",
  coverImage: "",
  durum: "Okunmadı",
};

const BookLibrary = ({ books }: BookLibraryProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openStatusDialog, setOpenStatusDialog] = useState<boolean>(false);
  const [openBookDialog, setOpenBookDialog] = useState<boolean>(false);
  const [durum, setDurum] = useState<string>("");
  const [editedBook, setEditedBook] = useState<BookWithoutId>(initalBookData);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleOpenStatusDialog = (book: BookWithoutId) => {
    setDurum(book.durum);
    setOpenStatusDialog(true);
  };

  const handleOpenBookDialog = (book: BookWithoutId) => {
    setEditedBook(book);
    setOpenBookDialog(true);
  };

  const handleBookInsert = async () => {
    console.log(editedBook);
    setOpenBookDialog(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kütüphanem</Typography>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Toolbar>
      </AppBar>

      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        centered
      >
        <Tab label="Okunan Kitaplar" />
        <Tab label="Okunacak Kitaplar" />
        <Tab label="Favoriler" />
      </Tabs>

      <Grid container spacing={3} style={{ padding: "20px" }}>
        {filteredBooks
          .filter(
            (book) =>
              (activeTab === 0 && book.durum === "okundu") ||
              (activeTab === 1 && book.durum === "okunacak") ||
              (activeTab === 2 && book.durum === "okunuyor")
          )
          .map((book) => (
            <Grid key={book._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <BookCard
                book={book}
                onStatusChange={handleOpenStatusDialog}
                onEdit={handleOpenBookDialog}
              />
            </Grid>
          ))}
      </Grid>

      <Fab
        color="primary"
        onClick={() => handleOpenBookDialog(initalBookData)}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <AddIcon />
      </Fab>

      <StatusDialog
        openStatusDialog={openStatusDialog}
        setOpenStatusDialog={setOpenStatusDialog}
        durum={durum}
        setDurum={setDurum}
      />
      <BookDialog
        openBookDialog={openBookDialog}
        setOpenBookDialog={setOpenBookDialog}
        editedBook={editedBook}
        setEditedBook={setEditedBook}
        handleBookInsert={handleBookInsert}
      />
    </div>
  );
};

export default BookLibrary;
