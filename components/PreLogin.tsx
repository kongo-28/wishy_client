import React from "react";
import styles from "@/styles/Home.module.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Paper } from "@mui/material";
import Link from "next/link";

const PreLogin = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        <Paper>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
              }
              title="ログインしていません"
            />
            <CardContent>
              {" "}
              未ログインではいいねが保存されません <br />
              ログインもしくはアカウント登録してください <br />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                sx={{
                  width: 300,
                  borderRadius: 0,
                }}
              >
                <Link href="/signin">signin</Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: 300,
                  borderRadius: 0,
                }}
              >
                <Link href="/signup">signup</Link>
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </div>
    </div>
  );
};

export default PreLogin;
