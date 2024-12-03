import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const BookCard = ({ book, onStatusChange, onEdit }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image="https://placekitten.com/200/300" // Placeholder image
        alt="book cover"
      />
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          Yazar: {book.author}
        </Typography>
        <Chip
          label={
            book.status === "okunuyor"
              ? "Okunuyor"
              : book.status === "okundu"
              ? "Okundu"
              : "Okunacak"
          }
          color={book.status === "okunuyor" ? "primary" : "default"}
          style={{ marginTop: "10px", marginRight: "10px" }}
          onClick={() => onStatusChange(book)}
        />
        <IconButton onClick={() => onEdit(book)} color="primary">
          <EditIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default BookCard;
