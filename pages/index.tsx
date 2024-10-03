import React, { useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from "@/styles/Home.module.css";
import Wish from "@/components/Wish";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewWish from "@/components/NewWish";
import Footer from "@/components/Footer";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/wishes");

const Home = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.main}>
      <ResponsiveAppBar domain={props.domain} />
      {props.user && (
        // ユーザーがいる場合に表示させるコンポーネント
        <div>{props.user.email}でログイン中</div>
      )}
      {!props.user && (
        // ユーザーがいない場合に表示させるコンポーネント
        <div>
          <p>
            未ログインです
            <br />
            いいねは保存されません
          </p>
          <div>
            <Link href="/signin">signin</Link>
          </div>
          <div>
            <Link href="/signup">signup</Link>
          </div>
        </div>
      )}
      <NewWish open={open} handleClose={handleClose} props={props} />

      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        sx={{ "& > :not(style)": { m: 1 } }}
      >
        <Fab onClick={handleClickOpen} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>

      <div className={styles.wishcontainer}>
        {props.wishes.map((wish: any) => (
          <div key={wish.id} className={styles.postCard}>
            <Wish wish={wish} user={props.user} domain={props.domain}></Wish>
          </div>
        ))}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Home;
