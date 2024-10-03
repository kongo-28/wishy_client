import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { pink } from "@mui/material/colors";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import axios from "axios";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";

const Wish = ({ wish, user, domain }: any) => {
  let like_count = 0;

  if (wish.likes) {
    if (wish.likes[0]) {
      like_count = wish.likes[0].count;
    } else {
      like_count = 0;
    }
  }

  const [likes, setLikes] = useState(like_count);

  const handleClickLikes = async () => {
    try {
      await axios.post(`${domain}/likes`, {
        user_id: user.id,
        wish_id: wish.id,
        count: likes,
      });
    } catch (error) {
      console.error("Failed to save likes on unload:", error);
    }
  };

  const debouncedHandleClickLikes = useDebouncedCallback(
    // function
    handleClickLikes,
    // delay in ms
    500
  );

  return (
    <div>
      <Container maxWidth="md">
        <Paper>
          <Card variant="outlined" sx={{ minWidth: 300 }}>
            <CardHeader
              title={wish.title}
              subheader={wish.updated_at.slice(0, 16)}
            />
            <CardContent>
              {" "}
              <p>{wish.content}</p>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={() => {
                  setLikes(likes + 1);
                  debouncedHandleClickLikes();
                }}
              >
                <FavoriteIcon />
                {likes}
              </IconButton>
              <IconButton
                aria-label="add to favorites"
                onClick={() => {
                  setLikes(likes + 9);
                  debouncedHandleClickLikes();
                }}
              >
                <LocalFireDepartmentIcon
                  sx={{ fontSize: 50, color: pink[500] }}
                />
              </IconButton>
              <IconButton
                aria-label="share"
                onClick={() => {
                  setLikes(likes + 100);
                  debouncedHandleClickLikes();
                }}
              >
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Paper>
      </Container>
    </div>
  );
};

export default Wish;
