import { Book } from "@/lib/types/types";
import { CardMedia, Chip } from "@mui/material";

interface ImageAndStatusBoxProps {
  book: Book;
  handleOpenStatusDialog: (book: Book) => void;
}

const ImageAndStatusBox = ({
  book,
  handleOpenStatusDialog,
}: ImageAndStatusBoxProps) => {
  return (
    <>
      <CardMedia
        component="img"
        sx={{
          width: 200,
          height: 300,
          borderRadius: 2,
          objectFit: "cover",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
          position: "relative",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
          },
        }}
        image={book.coverImage}
        alt="Kitap kapağı"
      />
      <Chip
        label={
          book.durum === "okunuyor"
            ? "Okunuyor"
            : book.durum === "okundu"
            ? "Okundu"
            : "Okunacak"
        }
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor:
            book.durum === "okunuyor"
              ? "#1976d2"
              : book.durum === "okundu"
              ? "#4caf50"
              : "#f44336",
          color: "white",
          opacity: 0.6,
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            backgroundColor:
              book.durum === "okunuyor"
                ? "#1565c0"
                : book.durum === "okundu"
                ? "#388e3c"
                : "#d32f2f",
            opacity: 0.9,
          },
        }}
        onClick={() => handleOpenStatusDialog(book)}
      />
    </>
  );
};

export default ImageAndStatusBox;
