import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewWish from "@/components/NewWish";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";
import WishList from "@/components/WishList";
import { Container } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ActionPlan from "@/components/ActionPlan";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/wishes");

const Home = (props: any) => {
  /////////////// NEW WISH////////////////
  const [open, setOpen] = useState(false);

  const handleClickOpenNew = () => {
    setOpen(true);
  };
  const handleCloseNew = () => {
    setOpen(false);
  };
  /////////////// NEW WISH////////////////
  /////////////// ACTION PLAN ////////////
  const [openAction, setOpenAction] = useState(false);

  const handleClickOpenAction = () => {
    setOpenAction(true);
  };
  const handleCloseAction = () => {
    setOpenAction(false);
  };

  /////////////// ACTION PLAN ////////////
  return (
    <div>
      <ResponsiveAppBar domain={props.domain} />

      <NewWish open={open} handleClose={handleCloseNew} props={props} />
      <ActionPlan
        open={openAction}
        handleClose={handleCloseAction}
        props={props}
      />
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
        {props.user && (
          <Profile
            user={props.user}
            wishes_user={props.wishes_user}
            handleClickOpen={handleClickOpenAction}
          ></Profile>
        )}

        <WishList
          wishes={props.wishes}
          user={props.user}
          domain={props.domain}
          wishes_user={props.wishes_user}
        ></WishList>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Home;
