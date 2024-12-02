import { TextField } from "@mui/material";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Kitap Ara"
      variant="outlined"
      size="small"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{
        maxWidth: "20rem",
        marginLeft: "auto",
        marginRight: "20px",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white", // İç kısmı beyaz yapar
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
