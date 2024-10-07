import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from "@/styles/Home.module.css";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewWish from "@/components/NewWish";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";
import WishList from "@/components/WishList";

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
      {props.user && (
        <Profile user={props.user} handleClickOpen={handleClickOpen}></Profile>
      )}

      <WishList
        wishes={props.wishes}
        user={props.user}
        domain={props.domain}
        wishes_user={props.wishes_user}
      ></WishList>

      <Footer></Footer>
    </div>
  );
};

export default Home;
