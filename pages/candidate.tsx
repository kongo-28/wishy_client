import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from "@/styles/Home.module.css";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewWish from "@/components/NewWish";
import Footer from "@/components/Footer";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/users/candidate");

const Candidate = (props: any) => {
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

      <div className={styles.wishcontainer}>
        <Container maxWidth="md">
          <Paper>
            <Card variant="outlined" sx={{ minWidth: 300 }}>
              <div className={styles.postCard}>{props.candidate}</div>
            </Card>
          </Paper>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Candidate;
