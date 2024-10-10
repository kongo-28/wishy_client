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
import { useDebouncedCallback } from "use-debounce";
import PeopleIcon from "@mui/icons-material/People";

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

  const clickHandler = async (wish: any) => {
    const title = wish.title;
    const count = wish.likes[0].count;
    const message = `${title}\t${count}`;

    try {
      await navigator.clipboard.writeText(message);
      alert("wishをクリップボードに保存しました。");
    } catch (error) {
      alert("クリップボードへの貼り付けが失敗しました。");
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader title={wish.title} subheader={wish.updated_at.slice(0, 16)} />
      <CardContent>
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
          {likes == 0 && <FavoriteIcon />}
          {likes >= 1 && likes < 1000 && (
            <FavoriteIcon sx={{ color: pink[200] }} />
          )}
          {likes >= 1000 && <FavoriteIcon sx={{ color: pink[500] }} />}

          {likes < 1000 && <p>{likes}</p>}
          {likes >= 1000 && likes < 1000000 && (
            <p>{(likes / 1000).toFixed(2)}k</p>
          )}
          {likes >= 1000000 && <p>{(likes / 1000000).toFixed(2)}m</p>}
        </IconButton>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            setLikes(likes + 9);
            debouncedHandleClickLikes();
          }}
        >
          {likes == 0 && <LocalFireDepartmentIcon sx={{ fontSize: 50 }} />}
          {likes >= 1 && likes < 1000 && (
            <LocalFireDepartmentIcon sx={{ fontSize: 50, color: pink[200] }} />
          )}
          {likes >= 1000 && (
            <LocalFireDepartmentIcon sx={{ fontSize: 50, color: pink[500] }} />
          )}
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={() => {
            clickHandler(wish);
          }}
        >
          <ShareIcon />
        </IconButton>
        <IconButton>
          <PeopleIcon></PeopleIcon>
          {wish.likes_user_count}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Wish;
