import React from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Paper } from "@mui/material";

const clickHandler = async (wishes_user: any) => {
  // ラベル行を定義
  const labels = "wish\t(likes)";
  // titleとlikesのcountを抽出してタブ区切り形式の文字列に変換
  const message = wishes_user
    .map((wish: any) => {
      const title = wish.title;
      const count = wish.likes[0].count;
      return `${title}\t(${count})`;
    })
    .join("\n");
  // ラベル行とデータ行を結合
  const finalMessage = `${labels}\n${message}`;
  try {
    await navigator.clipboard.writeText(finalMessage);
    alert("wishリストをクリップボードに保存しました。");
  } catch (error) {
    alert("クリップボードへの貼り付けが失敗しました。");
  }
};

const Profile = ({ user, wishes_user, handleClickOpen }: any) => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        <Paper>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {user.email.slice(0, 1)}
                </Avatar>
              }
              title={user.email}
            />
            <CardContent>
              {" "}
              叶えたいこととかやりたいことの方針的なこと <br />
              総いいね:777 総WISH:77 叶えたWISH:7
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                sx={{
                  width: 300,
                  borderRadius: 0,
                }}
              >
                <Link href="/candidate">wish候補</Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: 300,
                  borderRadius: 0,
                }}
                onClick={handleClickOpen}
              >
                プラン作成
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: 300,
                  borderRadius: 0,
                }}
                onClick={() => clickHandler(wishes_user)}
                endIcon={<SendIcon />}
              >
                リスト共有
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
