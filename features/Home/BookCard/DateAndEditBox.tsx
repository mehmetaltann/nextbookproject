import EditIcon from "@mui/icons-material/Edit";
import { Book } from "@/lib/types/types";
import { IconButton, Box } from "@mui/material";

interface DateAndEditBoxProps {
  book: Book;
  handleOpenBookUpdateDialog: (book: Book) => void;
}

const DateAndEditBox = ({
  book,
  handleOpenBookUpdateDialog,
}: DateAndEditBoxProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {book.okunmaTarihi && book.okunmaTarihi !== "" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "white",
            padding: "3px 6px",
            fontSize: "0.9rem",
            fontWeight: 500,
            borderRadius: "24px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            opacity: 0.9,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              transform: "scale(1.05)",
            },
          }}
        >
          {book.okunmaTarihi}
        </Box>
      )}
      <IconButton
        onClick={() => handleOpenBookUpdateDialog(book)}
        color="primary"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: "8px",
          borderRadius: "50%",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            transform: "scale(1.1)",
          },
        }}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default DateAndEditBox;
