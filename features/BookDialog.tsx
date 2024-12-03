import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { BookWithoutId } from "@/lib/types/types";
import { Dispatch, SetStateAction } from "react";
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
} from "@mui/material";

interface BookDialogProps {
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
  setOpenBookDialog,
  handleBookInsert,
}: BookDialogProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField", "DateField"]}>
        <Dialog open={openBookDialog} onClose={() => setOpenBookDialog(false)}>
          <DialogTitle>Kitap Bilgileri</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <TextField
                label="Kitap İsmi"
                fullWidth
                size="small"
                value={editedBook.title}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, title: e.target.value })
                }
              />
              <TextField
                label="ISBN"
                fullWidth
                size="small"
                value={editedBook.isbn}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, isbn: e.target.value })
                }
              />
              <TextField
                label="Yazar"
                fullWidth
                size="small"
                value={editedBook.author}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, author: e.target.value })
                }
              />
              <Grid
                size={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <TextField
                  label="Yayınevi"
                  fullWidth
                  size="small"
                  value={editedBook.yayinevi}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, yayinevi: e.target.value })
                  }
                />
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
              <Grid
                size={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <TextField
                  label="Tür"
                  fullWidth
                  size="small"
                  value={editedBook.tur}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, tur: e.target.value })
                  }
                />
                <TextField
                  size="small"
                  label="Kategori"
                  fullWidth
                  value={editedBook.kategori}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, kategori: e.target.value })
                  }
                />
              </Grid>
              <Grid
                size={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
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
                <TextField
                  label="Alınma Yeri"
                  size="small"
                  fullWidth
                  value={editedBook.alinmaYeri}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, alinmaYeri: e.target.value })
                  }
                />
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
              <Grid size={12}>
                <TextField
                  size="small"
                  label="Kapak Resmi Linki"
                  fullWidth
                  value={editedBook.coverImage}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, coverImage: e.target.value })
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
