import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import { useRouter } from "next/router";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface NewWishProps {
  open: boolean;
  handleClose: () => void;
  props: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewWish({ open, handleClose, props }: NewWishProps) {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await axios.post(`${props.domain}/wishes`, {
        title: data.get("title"),
        content: data.get("content"),
      });

      router.push("/"); //リダイレクト
    } catch (err) {
      alert("投稿に失敗しました");
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth={"md"}
      TransitionComponent={Transition}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const title = formJson.title;
          console.log(title);
          handleSubmit(event);
          handleClose();
        },
      }}
    >
      <DialogTitle minWidth={600}>New Wish</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="title"
          placeholder="What do you wish for?"
          type="title"
          fullWidth
        />
        <OutlinedInput
          margin="dense"
          id="content"
          name="content"
          label="content"
          placeholder="If you have any details."
          type="content"
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
