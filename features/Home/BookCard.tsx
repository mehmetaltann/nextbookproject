import { Book } from "@/lib/types/types";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Box,
} from "@mui/material";

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
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        width: "100%",
        height: 520,
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 200,
          height: 300,
          borderRadius: 1,
          objectFit: "cover",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          position: "relative",
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
          backgroundColor:
            book.durum === "okunuyor"
              ? "#1976d2" // Mavi: Okunuyor
              : book.durum === "okundu"
              ? "#4caf50" // Yeşil: Okundu
              : "#f44336", // Kırmızı: Okunacak
          color: "white",
          opacity: 0.7, // Saydamlık eklendi
          cursor: "pointer",
        }}
        onClick={() => handleOpenStatusDialog(book)}
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
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              wordBreak: "break-word",
              mb: 1,
            }}
          >
            {book.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Yazar:</strong> {book.author}
          </Typography>
        </Box>

        {/* Kategoriler */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            justifyContent: "center",
            mb: 2,
          }}
        >
          {book.kategori.map((kategori, index) => (
            <Chip
              key={index}
              label={`#${kategori}`}
              sx={{
                backgroundColor: "rgba(0, 150, 136, 0.2)",
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
      </CardContent>

      {/* Okunma Tarihi, Card sol alt köşesinde */}
      {book.okunmaTarihi && (
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "4px 8px",
            fontSize: "0.75rem",
            borderRadius: 1,
            opacity: 0.8,
          }}
        >
          {book.okunmaTarihi}
        </Box>
      )}

      {/* Edit butonu, sağ alt köşede */}
      <IconButton
        onClick={() => handleOpenBookUpdateDialog(book)}
        color="primary"
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: 0.5,
          borderRadius: "50%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <EditIcon />
      </IconButton>
    </Card>
  );
};

export default BookCard;
