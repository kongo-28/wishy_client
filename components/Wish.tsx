import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { pink } from "@mui/material/colors";

const Wish = ({ wish }: any) => {
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <Card variant="outlined">
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
            <FavoriteIcon sx={{ fontSize: 50, color: pink[500] }} />
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
