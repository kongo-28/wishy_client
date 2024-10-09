import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewWish from "@/components/NewWish";
import Footer from "@/components/Footer";
import { Container } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/chats");

const Chat = (props: any) => {
  /////////////// NEW WISH////////////////
  const [open, setOpen] = useState(false);

  const handleClickOpenNew = () => {
    setOpen(true);
  };
  const handleCloseNew = () => {
    setOpen(false);
  };
  /////////////// NEW WISH////////////////

  return (
    <div>
      <ResponsiveAppBar domain={props.domain} />
      <NewWish open={open} handleClose={handleCloseNew} props={props} />
      <Container maxWidth="md">
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          sx={{ "& > :not(style)": { m: 1 } }}
        >
          {" "}
          <Tooltip title="New Wish" placement="top">
            <Fab onClick={handleClickOpenNew} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>

        {props.chats.map((chat: any) => (
          <div key={chat.id}>
            <Card variant="outlined">
              <CardHeader title={chat.title} subheader={chat.request} />
              <CardContent>{chat.content}</CardContent>
            </Card>
          </div>
        ))}
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Chat;
