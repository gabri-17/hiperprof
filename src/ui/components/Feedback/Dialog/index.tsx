import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { PropsWithChildren } from "react";

interface DialogProps {
  isOpen?: boolean; // não é um campo obrigatório.
  onClose?: () => void; // não é um campo obrigatório.
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
}

export default function Dialog({
  isOpen = true,
  onClose,
  onCancel,
  onConfirm,
  title,
  children
}: PropsWithChildren<DialogProps>) {
  return (
    <MuiDialog open={isOpen} onClose={onClose}>
      <DialogTitle color={"primary"} fontSize={"small"} textAlign={"center"}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {onCancel && (
          <Button variant="outlined" onClick={onCancel} sx={{ py: 2, px: 3 }}>
            Cancelar
          </Button>
        )}
        <Button
          variant="contained"
          type="submit"
          onClick={onConfirm}
          fullWidth={onCancel == undefined}
        >
          Confirmar
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
