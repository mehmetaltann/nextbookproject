import { Book } from "@/lib/types/types";
import { Box } from "@mui/material";

interface CategoryBoxProps {
  book: Book;
}

const CategoryBox = ({ book }: CategoryBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {book.kategori.map((kategori, index) => (
        <Box
          key={index}
          sx={{
            padding: "4px 8px",
            color: "rgba(0, 0, 0, 0.6)",
            fontSize: "0.9rem",
            fontWeight: 500,
            marginBottom: "2px",
          }}
        >
          <span
            style={{
              margin: "0 -0.4em",
              padding: "0.1em 0.4em",
              borderRadius: "0.8em 0.3em",
              background: "transparent",
              backgroundImage:
                "linear-gradient(to right, rgba(144, 238, 144, 0.3), rgba(144, 238, 144, 0.6))",
              boxDecorationBreak: "clone",
              WebkitBoxDecorationBreak: "clone",
            }}
          >
            #{kategori}
          </span>
        </Box>
      ))}
    </Box>
  );
};

export default CategoryBox;
