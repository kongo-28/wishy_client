import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ActionPlan({ open, handleClose }: ForgotPasswordProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleClose();
        },
      }}
    >
      <DialogTitle>Action Plan</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          wishリストとwishそれぞれのアツさをもとにアクションプランを作成します。
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="additional"
          name="additional"
          label="additional"
          placeholder="空き時間や人数、ジャンルなど希望があれば入力"
          type="additional"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
