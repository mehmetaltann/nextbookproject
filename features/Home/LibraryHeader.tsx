import SearchBar from "./SearchBar";
import { Dispatch, memo, SetStateAction } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

interface LibraryHeaderProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  years: string[];
  books: {
    alinmaTarihi: string;
    okunmaTarihi: string;
    durum: string;
  }[];
  activeTab: number;
}

const LibraryHeader = memo(
  ({
    searchTerm,
    setSearchTerm,
    selectedYear,
    setSelectedYear,
    years,
    books,
    activeTab,
  }: LibraryHeaderProps) => {
    const getYearCount = (year: string) => {
      const filteredBooks = books.filter((book) => {
        const yearToCheck = year === "Tümü" ? "" : year;
        if (activeTab === 2) {
          return (
            book.durum === "okundu" && book.okunmaTarihi.startsWith(yearToCheck)
          );
        } else if (activeTab === 0) {
          return (
            book.durum === "okunacak" &&
            book.alinmaTarihi.startsWith(yearToCheck)
          );
        } else if (activeTab === 1) {
          return (
            book.durum === "okunuyor" &&
            book.alinmaTarihi.startsWith(yearToCheck)
          );
        }
        return false;
      });
      return filteredBooks.length;
    };

    const filterYears = years.filter((year) => getYearCount(year) > 0);

    return (
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
            Kütüphanem
          </Typography>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              minWidth: 150,
              "& .MuiInputBase-root": {
                color: "white",
                border: "1px solid white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="Yıl"
            >
              {filterYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year} ({getYearCount(year)})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    );
  }
);

export default LibraryHeader;
