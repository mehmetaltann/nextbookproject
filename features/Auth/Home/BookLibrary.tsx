"use client";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "./SearchBar";
import BookCard from "./BookCard";
import BookDialog from "./BookDialog";
import StatusDialog from "./StatusDialog";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Fab,
  TextField,
} from "@mui/material";

const BookLibrary = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState("");
  const [editedBook, setEditedBook] = useState({
    title: "",
    author: "",
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const books = [
    {
      id: 1,
      title: "Kitap 1",
      author: "Yazar 1",
      category: "Kategori 1",
      status: "okunuyor",
    },
    {
      id: 2,
      title: "Kitap 2",
      author: "Yazar 2",
      category: "Kategori 2",
      status: "okundu",
    },
    {
      id: 3,
      title: "Kitap 3",
      author: "Yazar 3",
      category: "Kategori 3",
      status: "okunacak",
    },
    {
      id: 4,
      title: "Kitap 4",
      author: "Yazar 4",
      category: "Kategori 4",
      status: "okunuyor",
    },
    {
      id: 5,
      title: "Kitap 5",
      author: "Yazar 5",
      category: "Kategori 5",
      status: "okundu",
    },
    {
      id: 6,
      title: "Kitap 6",
      author: "Yazar 6",
      category: "Kategori 6",
      status: "okunacak",
    },
    {
      id: 7,
      title: "Kitap 7",
      author: "Yazar 7",
      category: "Kategori 7",
      status: "okunuyor",
    },
    {
      id: 8,
      title: "Kitap 8",
      author: "Yazar 8",
      category: "Kategori 8",
      status: "okundu",
    },
    {
      id: 9,
      title: "Kitap 9",
      author: "Yazar 9",
      category: "Kategori 9",
      status: "okunacak",
    },
    {
      id: 10,
      title: "Kitap 10",
      author: "Yazar 10",
      category: "Kategori 10",
      status: "okunuyor",
    },
  ];

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenStatusDialog = (book) => {
    setBook(book);
    setStatus(book.status);
    setOpenStatusDialog(true);
  };

  const handleOpenEditDialog = (book) => {
    setBook(book);
    setEditedBook({
      title: book.title,
      author: book.author,
      category: book.category,
    });
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenStatusDialog(false);
    setOpenEditDialog(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kütüphanem</Typography>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Toolbar>
      </AppBar>

      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Okunan Kitaplar" />
        <Tab label="Okunacak Kitaplar" />
        <Tab label="Favoriler" />
      </Tabs>

      <Grid container spacing={3} style={{ padding: "20px" }}>
        {filteredBooks
          .filter(
            (book) =>
              (activeTab === 0 && book.status === "okundu") ||
              (activeTab === 1 && book.status === "okunacak") ||
              (activeTab === 2 && book.status === "okunuyor")
          )
          .map((book) => (
            <Grid key={book.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <BookCard
                book={book}
                onStatusChange={handleOpenStatusDialog}
                onEdit={handleOpenEditDialog}
              />
            </Grid>
          ))}
      </Grid>

      <Fab
        color="primary"
        onClick={() =>
          handleOpenEditDialog({ title: "", author: "", category: "" })
        }
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <AddIcon />
      </Fab>

      <StatusDialog
        open={openStatusDialog}
        handleClose={handleCloseDialog}
        status={status}
        setStatus={setStatus}
      />
      <BookDialog
        open={openEditDialog}
        handleClose={handleCloseDialog}
        book={editedBook}
        setEditedBook={setEditedBook}
      />
    </div>
  );
};

export default BookLibrary;
