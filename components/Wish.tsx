import React, { useEffect, useState } from "react";
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

const Wish = ({ wish, user }: any) => {
  const [likes, setLikes] = useState(
    wish.likes[0].count ? wish.likes[0].count : 0
  );

  useEffect(() => {
    const handleBeforeUnload = async (event: any) => {
      event.preventDefault();
      try {
        await axios.post("http://localhost:3000/likes", {
          user_id: user.id,
          wish_id: wish.id,
          count: likes,
        });
      } catch (error) {
        console.error("Failed to save likes on unload:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // クリーンアップ関数でイベントリスナーを解除
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [likes, user.id]);

  return (
    <div>
      <Card variant="outlined" sx={{ minWidth: 600 }}>
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
            onClick={() => setLikes(likes + 1)}
          >
            <FavoriteIcon />
            {likes}
          </IconButton>
          <IconButton
            aria-label="add to favorites"
            onClick={() => setLikes(likes + 9)}
          >
            <LocalFireDepartmentIcon sx={{ fontSize: 50, color: pink[500] }} />
          </IconButton>
          <IconButton aria-label="share" onClick={() => setLikes(likes + 100)}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Wish;
