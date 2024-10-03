import React from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from "@/styles/Home.module.css";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import Footer from "@/components/Footer";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/users/action");

const Home = (props: any) => {
  return (
    <div className={styles.main}>
      <ResponsiveAppBar domain={props.domain} />

      <div className={styles.wishcontainer}>
        <Container maxWidth="md">
          <Paper>
            <Card variant="outlined" sx={{ minWidth: 300 }}>
              <div className={styles.postCard}>{props.action_plan}</div>
            </Card>
          </Paper>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
