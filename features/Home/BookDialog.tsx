import Grid from "@mui/material/Grid2";
import { BookClassy, BookWithoutId } from "@/lib/types/types";
import { Dispatch, SetStateAction, useState } from "react";
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
  isLoading: boolean;
}

const BookDialog = ({
  openBookDialog,
  setEditedBook,
  editedBook,
  bookClassies,
  setOpenBookDialog,
  handleBookInsert,
  isLoading,
}: BookDialogProps) => {
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);

  const handleTypeChange = (event: any) => {
    const selectedType = event.target.value;
    setEditedBook({ ...editedBook, tur: selectedType, kategori: [] });
    const categories =
      bookClassies.find((item) => item.type === selectedType)?.categories || [];
    setAvailableCategories(categories);
  };

  return (
    <Dialog open={openBookDialog} onClose={() => setOpenBookDialog(false)}>
      <DialogTitle>Yeni Kitap Bilgileri</DialogTitle>
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
          <Grid
            size={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid size={8}>
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
            <Grid size={4}>
              <Select
                value={editedBook.durum}
                size="small"
                onChange={(e) =>
                  setEditedBook({ ...editedBook, durum: e.target.value })
                }
                fullWidth
              >
                <MenuItem value="okunuyor">Okunuyor</MenuItem>
                <MenuItem value="okundu">Okundu</MenuItem>
                <MenuItem value="okunacak">Okunacak</MenuItem>
              </Select>
            </Grid>
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
              <TextField
                label="İlk Yayın Yılı"
                size="small"
                fullWidth
                value={editedBook.yayinTarihi}
                onChange={(e) =>
                  setEditedBook({
                    ...editedBook,
                    yayinTarihi: e.target.value,
                  })
                }
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
            {/* Tür Seçimi */}
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
              <FormControl fullWidth size="small" disabled={!editedBook.tur}>
                <InputLabel id="kategori">Kategori</InputLabel>
                <Select
                  labelId="kategori"
                  id="kategori"
                  multiple
                  value={
                    Array.isArray(editedBook.kategori)
                      ? editedBook.kategori
                      : []
                  }
                  onChange={(e) =>
                    setEditedBook({
                      ...editedBook,
                      kategori:
                        typeof e.target.value === "string"
                          ? [e.target.value]
                          : e.target.value,
                    })
                  }
                  renderValue={(selected) =>
                    Array.isArray(selected) ? selected.join(", ") : ""
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
              <TextField
                label="Alınma Yılı"
                size="small"
                fullWidth
                value={editedBook.alinmaTarihi}
                onChange={(e) =>
                  setEditedBook({
                    ...editedBook,
                    alinmaTarihi: e.target.value,
                  })
                }
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
              <TextField
                label="Okunma Yılı"
                size="small"
                fullWidth
                value={editedBook.okunmaTarihi}
                onChange={(e) =>
                  setEditedBook({
                    ...editedBook,
                    okunmaTarihi: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Notlar"
              size="small"
              fullWidth
              multiline
              rows={2}
              value={editedBook.notlar}
              onChange={(e) =>
                setEditedBook({
                  ...editedBook,
                  notlar: e.target.value,
                })
              }
            />
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
        {isLoading ? (
          <Button disabled color="error">
            Lütfen Bekleyiniz
          </Button>
        ) : (
          <Button onClick={handleBookInsert} color="primary">
            Kaydet
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookDialog;
