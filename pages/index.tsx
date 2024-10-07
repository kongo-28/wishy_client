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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.main}>
      <ResponsiveAppBar domain={props.domain} />

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
      <div className={styles.wishcontainer}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="ALL WISH" {...a11yProps(0)} />
              <Tab label="MY WISH" {...a11yProps(1)} />
              <Tab label="Coming soon..." {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {props.wishes.map((wish: any) => (
              <div key={wish.id} className={styles.postCard}>
                <Wish
                  wish={wish}
                  user={props.user}
                  domain={props.domain}
                ></Wish>
              </div>
            ))}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {props.wishes.map((wish: any) => (
              <div key={wish.id} className={styles.postCard}>
                <Wish
                  wish={wish}
                  user={props.user}
                  domain={props.domain}
                ></Wish>
              </div>
            ))}
          </CustomTabPanel>
        </Box>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Home;
