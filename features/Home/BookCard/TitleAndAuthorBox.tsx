import { Book } from "@/lib/types/types";
import { Typography, Box } from "@mui/material";

interface TitleAndAuthorBoxProps {
  book: Book;
}

const TitleAndAuthorBox = ({ book }: TitleAndAuthorBoxProps) => {
  return (
    <Box sx={{ textAlign: "center", mb: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "600",
          fontSize: "1rem",
          letterSpacing: "0.5px",
          mb: 0.5,
          color: "text.primary",
          transition: "color 0.3s",
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        {book.title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <strong>Yazar: </strong> {book.author}
      </Typography>
    </Box>
  );
};

export default TitleAndAuthorBox;
