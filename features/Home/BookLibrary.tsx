"use client";
import LibraryHeader from "./LibraryHeader";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import StatusDialog from "./StatusDialog";
import BookDialog from "./BookDialog";
import BookCard from "./BookCard";
import BookUpdateDialog from "./BookUpdateDialog";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Book, BookClassy, BookWithoutId } from "@/lib/types/types";
import { toast } from "react-toastify";
import { handleResponseMsg } from "@/utils/toast-helper";
import { addBooks, updateBook, updateBookStatus } from "@/app/actions/action";
import { useRouter } from "next/navigation";
import { Tabs, Tab, Fab, useTheme, useMediaQuery } from "@mui/material";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  SetStateAction,
} from "react";

interface BookLibraryProps {
  books: Book[];
  bookClassies: BookClassy[];
}

const initalBookData: BookWithoutId = {
  title: "",
  author: "",
  isbn: "",
  yayinevi: "",
  sayfaSayisi: "",
  tur: "",
  kategori: [],
  yayinTarihi: "",
  alinmaTarihi: "",
  okunmaTarihi: "09092087",
  alinmaYeri: "Konya",
  coverImage: "",
  durum: "okunacak",
  notlar: "",
};

const BookLibrary = ({ books, bookClassies }: BookLibraryProps) => {
  const [activeTab, setActiveTab] = useState<number>(2);
  const [openStatusDialog, setOpenStatusDialog] = useState<boolean>(false);
  const [openBookDialog, setOpenBookDialog] = useState<boolean>(false);
  const [openBookUpdateDialog, setOpenBookUpdateDialog] =
    useState<boolean>(false);
  const [durum, setDurum] = useState<string>("");
  const [editedBook, setEditedBook] = useState<any>(initalBookData);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>("Tümü");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const navigateToParameters = () => router.push("/parameters");

  const years = useMemo(() => {
    const relevantBooks = books.filter((book) =>
      activeTab === 2 ? book.durum === "okundu" : true
    );
    return [
      "Tümü",
      ...new Set(
        relevantBooks
          .map((book) => {
            const date =
              activeTab === 2 ? book.okunmaTarihi : book.alinmaTarihi;
            return date ? date.slice(0, 4) : "";
          })
          .filter((year) => year !== "")
      ),
    ];
  }, [books, activeTab]);

  // Filtered Books based on search, year and tab
  const filteredBooks = useMemo(() => {
    const searchQuery = debouncedSearchTerm.toLowerCase();
    return books.filter((book) => {
      const isTitleOrAuthorMatch =
        book.title.toLowerCase().includes(searchQuery) ||
        book.author.toLowerCase().includes(searchQuery);
      const isCategoryMatch = book.kategori.some((kategori) =>
        kategori.toLowerCase().includes(searchQuery)
      );
      const isYearMatch =
        selectedYear === "Tümü" ||
        (activeTab === 2 && book.okunmaTarihi.startsWith(selectedYear)) ||
        ((activeTab === 0 || activeTab === 1) &&
          book.alinmaTarihi.startsWith(selectedYear));
      const isTabMatch =
        (activeTab === 0 && book.durum === "okunacak") ||
        (activeTab === 1 && book.durum === "okunuyor") ||
        (activeTab === 2 && book.durum === "okundu");

      return (
        (isTitleOrAuthorMatch || isCategoryMatch) && isYearMatch && isTabMatch
      );
    });
  }, [debouncedSearchTerm, books, selectedYear, activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle Tab Change
  const handleTabChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
    setSelectedYear("Tümü");
  };

  const handleOpenStatusDialog = (book: BookWithoutId) => {
    setEditedBook(book);
    setOpenStatusDialog(true);
  };

  const handleOpenBookUpdateDialog = (book: BookWithoutId) => {
    setEditedBook(book);
    setOpenBookUpdateDialog(true);
  };

  const handleOpenBookDialog = (book: BookWithoutId) => {
    setEditedBook(book);
    setOpenBookDialog(true);
  };

  const handleBookStatusUpdate = useCallback(async () => {
    try {
      setIsloading(true);
      const res = await updateBookStatus(editedBook._id, durum);
      handleResponseMsg(res);
      setOpenStatusDialog(false);
    } catch (error) {
      toast.error("Kitap Durumu Güncellenemedi, Bir hata oluştu: " + error);
    } finally {
      setIsloading(false);
    }
  }, [editedBook._id, durum]);

  const handleBookUpdate = useCallback(async () => {
    try {
      setIsloading(true);
      const res = await updateBook(editedBook._id, editedBook);
      handleResponseMsg(res);
      setOpenBookUpdateDialog(false);
    } catch (error) {
      toast.error("Kitap Güncellenemedi, Bir hata oluştu: " + error);
    } finally {
      setIsloading(false);
    }
  }, [editedBook._id, editedBook]);

  const handleBookInsert = useCallback(async () => {
    try {
      const res = await addBooks(editedBook);
      handleResponseMsg(res);
      setOpenBookDialog(false);
    } catch (error) {
      toast.error("Kitap Eklenemedi, Bir hata oluştu: " + error);
    }
  }, [editedBook]);

  return (
    <>
      <LibraryHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        years={years}
        books={books}
        activeTab={activeTab}
      />
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : undefined}
        centered={!isMobile}
        sx={{ mb: 2 }}
      >
        <Tab label="Okunacak Kitaplar" />
        <Tab label="Şu Sıralar Okunuyor" />
        <Tab label="Okunmuş Kitaplar" />
      </Tabs>
      <Grid container spacing={2} sx={{ p: 1 }} alignItems="stretch">
        {filteredBooks
          .filter(
            (book) =>
              (activeTab === 0 && book.durum === "okunacak") ||
              (activeTab === 1 && book.durum === "okunuyor") ||
              (activeTab === 2 && book.durum === "okundu")
          )
          .map((book) => (
            <Grid key={book._id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
              <BookCard
                book={book}
                handleOpenStatusDialog={handleOpenStatusDialog}
                handleOpenBookUpdateDialog={handleOpenBookUpdateDialog}
              />
            </Grid>
          ))}
      </Grid>
      <Fab
        color="primary"
        onClick={() => handleOpenBookDialog(initalBookData)}
        sx={{ position: "fixed", bottom: "20px", right: "80px" }}
      >
        <AddIcon />
      </Fab>
      <Fab
        color="secondary"
        onClick={navigateToParameters}
        sx={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <SkipNextIcon />
      </Fab>
      <StatusDialog
        openStatusDialog={openStatusDialog}
        setOpenStatusDialog={setOpenStatusDialog}
        handleBookStatusUpdate={handleBookStatusUpdate}
        durum={durum}
        setDurum={setDurum}
      />
      <BookDialog
        openBookDialog={openBookDialog}
        setOpenBookDialog={setOpenBookDialog}
        editedBook={editedBook}
        setEditedBook={setEditedBook}
        handleBookInsert={handleBookInsert}
        bookClassies={bookClassies}
        isLoading={isLoading}
      />
      <BookUpdateDialog
        openBookUpdateDialog={openBookUpdateDialog}
        setOpenBookUpdateDialog={setOpenBookUpdateDialog}
        editedBook={editedBook}
        setEditedBook={setEditedBook}
        handleBookUpdate={handleBookUpdate}
        bookClassies={bookClassies}
        isLoading={isLoading}
      />
    </>
  );
};

export default BookLibrary;
