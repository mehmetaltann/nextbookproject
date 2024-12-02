import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const BookDialog = ({ open, handleClose, book, setEditedBook }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Kitap Düzenle</DialogTitle>
      <DialogContent>
        <TextField
          label="Kitap Başlığı"
          fullWidth
          value={book.title}
          onChange={(e) => setEditedBook({ ...book, title: e.target.value })}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Yazar"
          fullWidth
          value={book.author}
          onChange={(e) => setEditedBook({ ...book, author: e.target.value })}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Kategori"
          fullWidth
          value={book.category}
          onChange={(e) => setEditedBook({ ...book, category: e.target.value })}
          style={{ marginBottom: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          İptal
        </Button>
        <Button onClick={handleClose} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDialog;
