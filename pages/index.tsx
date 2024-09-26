import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from "@/styles/Home.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/wishes");

const Home = (props: any) => {
  return (
    <div className={styles.main}>
      <ResponsiveAppBar />
      {props.user && (
        // ユーザーがいる場合に表示させるコンポーネント
        <div>{props.user.email}でログイン中</div>
      )}
      {!props.user && (
        // ユーザーがいない場合に表示させるコンポーネント
        <div>未ログインです</div>
      )}
      <div>
        <Link href="http://localhost:3001/signin">signin</Link>
      </div>
      <div>
        <Link href="http://localhost:3001/signup">signup</Link>
      </div>
      <div>
        {props.wishes.map((wish: any) => (
          <div key={wish.id}>
            <Card variant="outlined">
              <CardHeader
                title={wish.title}
                subheader={wish.updated_at.slice(0, 16)}
              />
              <CardContent>
                {" "}
                <p>{wish.content}</p>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
