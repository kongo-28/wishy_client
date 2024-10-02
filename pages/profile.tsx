import React, { useState } from "react";
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
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import ActionPlan from "@/components/ActionPlan";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/users");

const Profile = (props: any) => {
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
      <div className={styles.wishcontainer}>
        <Container maxWidth="md">
          <Paper>
            <Card variant="outlined" sx={{ minWidth: 300 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {props.user.email.slice(0, 1)}
                  </Avatar>
                }
                title={props.user.email}
              />
              <CardContent>
                {" "}
                叶えたいこととかやりたいことの方針的なこと
              </CardContent>
              <CardActions disableSpacing>
                総いいね:777 総WISH:77 叶えたWISH:7
              </CardActions>
            </Card>
            <Stack spacing={2} direction="row">
              <Button variant="contained">wish候補リスト作成</Button>
              <Button variant="contained" onClick={handleClickOpen}>
                アクションプラン作成
              </Button>
              <Button variant="contained" endIcon={<SendIcon />}>
                wishリストの共有
              </Button>
            </Stack>
          </Paper>
        </Container>
      </div>
      <ActionPlan open={open} handleClose={handleClose} />
      <div>wishリスト</div>
      <div className={styles.wishcontainer}>
        {props.wishes.map((wish: any) => (
          <div key={wish.id} className={styles.postCard}>
            <Wish wish={wish} user={props.user} domain={props.domain}></Wish>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
