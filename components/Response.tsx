import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
  response: any;
}

///////////クリップボードに貼り付け////////////////
const clickHandler = async (response: any) => {
  // titleとlikesのcountを抽出してタブ区切り形式の文字列に変換
  const message = response;

  try {
    await navigator.clipboard.writeText(message);
    alert("クリップボードに保存しました。");
  } catch (error) {
    alert("クリップボードへの貼り付けが失敗しました。");
  }
};
///////////クリップボードに貼り付け////////////////

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Response({
  open,
  handleClose,
  response,
}: ForgotPasswordProps) {
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
          const request = formJson.request;
          console.log(request);
          handleClose();
        },
      }}
    >
      <DialogTitle>回答</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>{response}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={() => clickHandler(response)}>共有</Button>
      </DialogActions>
    </Dialog>
  );
}
