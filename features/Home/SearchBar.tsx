import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <TextField
      label="Kitap Ara"
      variant="outlined"
      size="small"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: "4px",
        maxWidth: "20rem",
        marginLeft: "auto",
        marginRight: "20px",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
      }}
    />
  );
};

export default SearchBar;
