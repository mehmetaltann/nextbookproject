import DateAndEditBox from "./BookCard/DateAndEditBox";
import ImageAndStatusBox from "./BookCard/ImageAndStatusBox";
import CategoryBox from "./BookCard/CategoryBox";
import TitleAndAuthorBox from "./BookCard/TitleAndAuthorBox";
import { Book } from "@/lib/types/types";
import { Card, CardContent } from "@mui/material";

interface BookCardProps {
  book: Book;
  handleOpenStatusDialog: (book: Book) => void;
  handleOpenBookUpdateDialog: (book: Book) => void;
}

const BookCard = ({
  book,
  handleOpenStatusDialog,
  handleOpenBookUpdateDialog,
}: BookCardProps) => {
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        width: "100%",
        height: 520,
        position: "relative",
      }}
    >
      {/* Resim ve Durum */}
      <ImageAndStatusBox
        book={book}
        handleOpenStatusDialog={handleOpenStatusDialog}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Başlık ve Yazar */}
        <TitleAndAuthorBox book={book} />
        {/* Kategoriler */}
        <CategoryBox book={book} />
      </CardContent>
      {/* Okunma Tarihi ve Edit Iconu Box */}
      <DateAndEditBox
        book={book}
        handleOpenBookUpdateDialog={handleOpenBookUpdateDialog}
      />
    </Card>
  );
};

export default BookCard;
