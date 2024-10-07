import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Paper } from "@mui/material";

const Profile = ({ user, handleClickOpen }: any) => {
  return (
    <div className={styles.wishcontainer}>
      <Container maxWidth="md">
        <Paper>
          <Card variant="outlined" sx={{ minWidth: 300 }}>
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
              叶えたいこととかやりたいことの方針的なこと
            </CardContent>
            <CardActions disableSpacing>
              総いいね:777 総WISH:77 叶えたWISH:7
            </CardActions>
          </Card>
          <Stack spacing={2} direction="row">
            <Button variant="contained">
              <Link href="/candidate">wish候補提案</Link>
            </Button>
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
  );
};

export default Profile;
