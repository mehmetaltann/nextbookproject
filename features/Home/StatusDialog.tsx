import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

interface StatusDialogProps {
  openStatusDialog: boolean;
  durum: string;
  setDurum: Dispatch<SetStateAction<string>>;
  setOpenStatusDialog: Dispatch<SetStateAction<boolean>>;
  handleBookStatusUpdate: () => void;
}

const StatusDialog = ({
  handleBookStatusUpdate,
  openStatusDialog,
  setOpenStatusDialog,
  durum,
  setDurum,
}: StatusDialogProps) => {
  return (
    <Dialog
      open={openStatusDialog}
      onClose={() => setOpenStatusDialog(false)}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "250px",
        },
      }}
    >
      <DialogTitle>Durum Değiştir</DialogTitle>
      <DialogContent>
        <Select
          value={durum}
          size="small"
          sx={{ width: "100%" }}
          onChange={(e) => setDurum(e.target.value)}
          fullWidth
        >
          <MenuItem value="okunuyor">Okunuyor</MenuItem>
          <MenuItem value="okundu">Okundu</MenuItem>
          <MenuItem value="okunacak">Okunacak</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenStatusDialog(false)} color="primary">
          İptal
        </Button>
        <Button onClick={handleBookStatusUpdate} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusDialog;
