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
import axios from "axios";
import Cookies from "js-cookie";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
  props: any;
  setLoading: any;
  setOpenResponse: any;
  setResponse: any;
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
  setLoading,
  setOpenResponse,
  setResponse,
}: ForgotPasswordProps) {
  //////////// アクションプラン作成リクエスト ////////////

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true); // ローディング開始
    try {
      const response = await axios.post(
        `${props.domain}/chats`,
        { request: data.get("request") },
        {
          headers: {
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
          },
        }
      );
      setLoading(false); // ローディング終了

      // alert(`${JSON.stringify(response.data.content)}`); // レスポンスデータを表示する
      setResponse(`${JSON.stringify(response.data.content)}`);
      setOpenResponse(true);
    } catch (err) {
      alert("アクションプランのリクエストに失敗しました");
    }
  };
  //////////// アクションプラン作成リクエスト ////////////

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
          wishリストと熱意をもとにアクションプランを作成します。
          <br /> ＜入力例＞
          <br />
          次の日曜日の午前中の予定を立てて！
          <br />
          友達3人と一緒に遊ぶ予定を立てて！
        </DialogContentText>
        <OutlinedInput
          autoFocus
          margin="dense"
          id="request"
          name="request"
          label="request"
          placeholder="空き時間や人数、ジャンルなど希望があれば入力"
          type="request"
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
