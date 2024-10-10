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
import Candidate from "@/components/Candidate";
import Response from "@/components/Response";
import CircularProgress from "@mui/material/CircularProgress";

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

  const [loading, setLoading] = useState(false); // ローディング状態を管理

  /////////////// ACTION PLAN ////////////
  /////////////// Candidate ////////////
  const [openCandidate, setOpenCandidate] = useState(false);

  const handleClickOpenCandidate = () => {
    setOpenCandidate(true);
  };
  const handleCloseCandidate = () => {
    setOpenCandidate(false);
  };

  /////////////// Candidate ////////////
  /////////////// Response ////////////
  const [openResponse, setOpenResponse] = useState(false);
  const [response, setResponse] = useState("レスポンス！");

  const handleClickOpenResponse = () => {
    setOpenResponse(true);
  };
  const handleCloseResponse = () => {
    setOpenResponse(false);
  };

  /////////////// Response ////////////
  return (
    <div>
      <ResponsiveAppBar domain={props.domain} />
      {loading && (
        <Box sx={{ display: "flex" }}>
          {/* ローディング中の表示 */}
          <CircularProgress />
        </Box>
      )}
      <NewWish open={open} handleClose={handleCloseNew} props={props} />
      <Response
        open={openResponse}
        handleClose={handleCloseResponse}
        props={props}
        response={response}
      />
      <ActionPlan
        open={openAction}
        handleClose={handleCloseAction}
        props={props}
        setLoading={setLoading}
        setOpenResponse={setOpenResponse}
        setResponse={setResponse}
      />
      <Candidate
        open={openCandidate}
        handleClose={handleCloseCandidate}
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
            handleClickOpenAction={handleClickOpenAction}
            handleClickOpenCandidate={handleClickOpenCandidate}
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
