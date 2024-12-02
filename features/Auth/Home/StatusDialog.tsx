import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const StatusDialog = ({ open, handleClose, status, setStatus }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Durum Değiştir</DialogTitle>
      <DialogContent>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="okunuyor">Okunuyor</MenuItem>
          <MenuItem value="okundu">Okundu</MenuItem>
          <MenuItem value="okunacak">Okunacak</MenuItem>
        </Select>
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

export default StatusDialog;
