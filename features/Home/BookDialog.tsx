import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { BookClassy, BookWithoutId } from "@/lib/types/types";
import { Dispatch, SetStateAction, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

interface BookDialogProps {
  bookClassies: BookClassy[];
  openBookDialog: boolean;
  editedBook: BookWithoutId;
  setEditedBook: Dispatch<SetStateAction<BookWithoutId>>;
  setOpenBookDialog: Dispatch<SetStateAction<boolean>>;
  handleBookInsert: () => void;
}

const BookDialog = ({
  openBookDialog,
  setEditedBook,
  editedBook,
  bookClassies,
  setOpenBookDialog,
  handleBookInsert,
}: BookDialogProps) => {
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);

  const handleTypeChange = (event: any) => {
    const selectedType = event.target.value;
    setEditedBook({ ...editedBook, tur: selectedType, kategori: "" });

    const categories =
    bookClassies.find((item) => item.type === selectedType)
        ?.categories || [];
    setAvailableCategories(categories);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField", "DateField"]}>
        <Dialog open={openBookDialog} onClose={() => setOpenBookDialog(false)}>
          <DialogTitle>Kitap Bilgileri</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  label="Kitap İsmi"
                  fullWidth
                  size="small"
                  value={editedBook.title}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, title: e.target.value })
                  }
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="ISBN"
                  fullWidth
                  size="small"
                  value={editedBook.isbn}
                  onChange={(e) => {
                    const isbnValue = e.target.value;
                    setEditedBook({
                      ...editedBook,
                      isbn: isbnValue,
                      coverImage: `https://covers.openlibrary.org/b/isbn/${isbnValue}-L.jpg`,
                    });
                  }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Yazar"
                  fullWidth
                  size="small"
                  value={editedBook.author}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, author: e.target.value })
                  }
                />
              </Grid>
              <Grid
                size={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid size={4}>
                  <TextField
                    label="Yayınevi"
                    fullWidth
                    size="small"
                    value={editedBook.yayinevi}
                    onChange={(e) =>
                      setEditedBook({ ...editedBook, yayinevi: e.target.value })
                    }
                  />
                </Grid>
                <Grid size={4}>
                  <DateField
                    label="Yayın Tarihi"
                    fullWidth
                    size="small"
                    format="DD/MM/YYYY"
                    value={
                      editedBook.yayinTarihi
                        ? dayjs(editedBook.yayinTarihi)
                        : null
                    }
                    onChange={(newValue) => {
                      setEditedBook({
                        ...editedBook,
                        yayinTarihi: newValue
                          ? newValue.format("YYYY-MM-DD")
                          : "",
                      });
                    }}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Sayfa Sayısı"
                    fullWidth
                    size="small"
                    value={editedBook.sayfaSayisi}
                    onChange={(e) =>
                      setEditedBook({
                        ...editedBook,
                        sayfaSayisi: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                size={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid size={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="tur">Tür</InputLabel>
                    <Select
                      labelId="tur"
                      id="tur"
                      value={editedBook.tur}
                      onChange={handleTypeChange}
                    >
                      <MenuItem value="">Seçiniz</MenuItem>
                      {bookClassies.map((item) => (
                        <MenuItem key={item.type} value={item.type}>
                          {item.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={6}>
                  <FormControl
                    fullWidth
                    size="small"
                    disabled={!editedBook.tur}
                  >
                    <InputLabel id="kategori">Kategori</InputLabel>
                    <Select
                      labelId="kategori"
                      id="kategori"
                      value={editedBook.kategori}
                      onChange={(e) =>
                        setEditedBook({
                          ...editedBook,
                          kategori: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="">Seçiniz</MenuItem>
                      {availableCategories.map((category: any) => (
                        <MenuItem key={category.name} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                size={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid size={4}>
                  <DateField
                    label="Alınma Tarihi"
                    fullWidth
                    format="DD/MM/YYYY"
                    size="small"
                    value={
                      editedBook.alinmaTarihi
                        ? dayjs(editedBook.alinmaTarihi)
                        : null
                    }
                    onChange={(newValue) => {
                      setEditedBook({
                        ...editedBook,
                        alinmaTarihi: newValue
                          ? newValue.format("YYYY-MM-DD")
                          : "",
                      });
                    }}
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Alınma Yeri"
                    size="small"
                    fullWidth
                    value={editedBook.alinmaYeri}
                    onChange={(e) =>
                      setEditedBook({
                        ...editedBook,
                        alinmaYeri: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid size={4}>
                  <DateField
                    label="Okunma Tarihi"
                    fullWidth
                    size="small"
                    format="DD/MM/YYYY"
                    value={
                      editedBook.okunmaTarihi
                        ? dayjs(editedBook.okunmaTarihi)
                        : null
                    }
                    onChange={(newValue) => {
                      setEditedBook({
                        ...editedBook,
                        okunmaTarihi: newValue
                          ? newValue.format("YYYY-MM-DD")
                          : "",
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid size={12}>
                <TextField
                  size="small"
                  label="Kapak Resmi Linki"
                  fullWidth
                  value={editedBook.coverImage}
                  onChange={(e) =>
                    setEditedBook({
                      ...editedBook,
                      coverImage: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenBookDialog(false)} color="primary">
              İptal
            </Button>
            <Button onClick={handleBookInsert} color="primary">
              Kaydet
            </Button>
          </DialogActions>
        </Dialog>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BookDialog;
