import React from "react";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import Wish from "@/components/Wish";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/users");

const Profile = (props: any) => {
  return (
    <div className={styles.main}>
      <ResponsiveAppBar />
      <Card variant="outlined" sx={{ minWidth: 600 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {props.user.email.slice(0, 1)}
            </Avatar>
          }
          title={props.user.email}
        />
        <CardContent> 叶えたいこととかやりたいことの方針的なこと</CardContent>
        <CardActions disableSpacing>
          総いいね:777 総WISH:77 叶えたWISH:7
        </CardActions>
      </Card>
      wishリスト
      <div>
        {props.wishes.map((wish: any) => (
          <div key={wish.id} className={styles.postCard}>
            <Wish wish={wish} user={props.user}></Wish>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
