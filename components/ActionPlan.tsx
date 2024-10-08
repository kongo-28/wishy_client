import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/router";
import axios from "axios";

interface ForgotPasswordProps {
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

export default function ActionPlan({
  open,
  handleClose,
  props,
}: ForgotPasswordProps) {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await axios.post(`${props.domain}/users/action_plan`, {
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
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const content = formJson.content;
          console.log(content);
          handleSubmit(event);
          handleClose();
        },
      }}
    >
      <DialogTitle>Action Plan</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          wishリストとwishのアツさをもとにアクションプランを作成します。
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="content"
          name="content"
          label="content"
          placeholder="空き時間や人数、ジャンルなど希望があれば入力"
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
