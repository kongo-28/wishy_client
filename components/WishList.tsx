import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Wish from "@/components/Wish";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const WishList = (props: any) => {
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

  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  /////////////////////////////////////////////並び替え機能///////////////////////////////////////////////////////
  const [sortedWishes, setSortedWishes] = useState(props.wishes);
  const [sortOrder, setSortOrder] = useState("none"); // none, ascend, descend, like_ascend, like_descend
  ///////////////////投稿順////////////////////
  const handleSortDate = () => {
    let newSortOrder;
    let sortedWishes;

    if (sortOrder === "none") {
      sortedWishes = [...props.wishes].sort((a, b) => {
        if (a.updated_at < b.updated_at) return -1;
        if (a.updated_at > b.updated_at) return 1;
        return 0;
      });
      newSortOrder = "ascend";
    } else if (sortOrder === "ascend") {
      sortedWishes = [...props.wishes].sort((a, b) => {
        if (a.updated_at < b.updated_at) return 1;
        if (a.updated_at > b.updated_at) return -1;
        return 0;
      });
      newSortOrder = "descend";
    } else {
      sortedWishes = props.wishes;
      newSortOrder = "none";
    }

    setSortedWishes(sortedWishes);
    setSortOrder(newSortOrder);
  };
  ///////////////////いいね順////////////////////
  const handleSortLikes = () => {
    let newSortOrder;
    let sortedWishes;

    const getLikesCount = (wish: any) =>
      wish.likes && wish.likes[0] ? wish.likes[0].count : 0;

    if (sortOrder === "none") {
      sortedWishes = [...props.wishes].sort((a, b) => {
        return getLikesCount(a) - getLikesCount(b);
      });
      newSortOrder = "likes_ascend";
    } else if (sortOrder === "likes_ascend") {
      sortedWishes = [...props.wishes].sort((a, b) => {
        return getLikesCount(b) - getLikesCount(a);
      });
      newSortOrder = "likes_descend";
    } else {
      sortedWishes = props.wishes;
      newSortOrder = "none";
    }

    setSortedWishes(sortedWishes);
    setSortOrder(newSortOrder);
  };
  ///////MY WISH LIST
  const [sortedWishesUser, setSortedWishesUser] = useState(props.wishes_user);
  const [sortOrderUser, setSortOrderUser] = useState("none"); // none, ascend, descend

  const handleSortDateUser = () => {
    let newSortOrderUser;
    let sortedWishesUser;

    if (sortOrderUser === "none") {
      sortedWishesUser = [...props.wishes_user].sort((a, b) => {
        if (a.updated_at < b.updated_at) return -1;
        if (a.updated_at > b.updated_at) return 1;
        return 0;
      });
      newSortOrderUser = "ascend";
    } else if (sortOrderUser === "ascend") {
      sortedWishesUser = [...props.wishes_user].sort((a, b) => {
        if (a.updated_at < b.updated_at) return 1;
        if (a.updated_at > b.updated_at) return -1;
        return 0;
      });
      newSortOrderUser = "descend";
    } else {
      sortedWishesUser = props.wishes_user;
      newSortOrderUser = "none";
    }

    setSortedWishesUser(sortedWishesUser);
    setSortOrderUser(newSortOrderUser);
  };
  /////////////////いいね順////////////////////////
  const handleSortLikesUser = () => {
    let newSortOrderUser;
    let sortedWishesUser;

    if (sortOrderUser === "none") {
      sortedWishesUser = [...props.wishes_user].sort((a, b) => {
        if (a.likes[0].count < b.likes[0].count) return -1;
        if (a.likes[0].count > b.likes[0].count) return 1;
        return 0;
      });
      newSortOrderUser = "likes_ascend";
    } else if (sortOrderUser === "likes_ascend") {
      sortedWishesUser = [...props.wishes_user].sort((a, b) => {
        if (a.likes[0].count < b.likes[0].count) return 1;
        if (a.likes[0].count > b.likes[0].count) return -1;
        return 0;
      });
      newSortOrderUser = "likes_descend";
    } else {
      sortedWishesUser = props.wishes_user;
      newSortOrderUser = "none";
    }

    setSortedWishesUser(sortedWishesUser);
    setSortOrderUser(newSortOrderUser);
  };
  /////////////////////////////////////////////並び替え機能///////////////////////////////////////////////////////

  return (
    <div className={styles.wishcontainer}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <div className={styles.wishTabs}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="ALL WISH" {...a11yProps(0)} />
              <Tab label="MY WISH" {...a11yProps(1)} />
            </Tabs>
          </div>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Button onClick={handleSortDate}>投稿順</Button>
          {sortOrder == "ascend" && (
            <ArrowUpwardIcon fontSize="small"></ArrowUpwardIcon>
          )}
          {sortOrder == "descend" && (
            <ArrowDownwardIcon fontSize="small"></ArrowDownwardIcon>
          )}

          <Button onClick={handleSortLikes}>いいね順</Button>
          {sortOrder == "likes_ascend" && (
            <ArrowUpwardIcon fontSize="small"></ArrowUpwardIcon>
          )}
          {sortOrder == "likes_descend" && (
            <ArrowDownwardIcon fontSize="small"></ArrowDownwardIcon>
          )}

          {sortedWishes.map((wish: any) => (
            <div key={wish.id} className={styles.postCard}>
              <Wish wish={wish} user={props.user} domain={props.domain}></Wish>
            </div>
          ))}
        </CustomTabPanel>
        {props.user && (
          <CustomTabPanel value={value} index={1}>
            <Button onClick={handleSortDateUser}>投稿順</Button>
            {sortOrderUser == "ascend" && <ArrowUpwardIcon></ArrowUpwardIcon>}
            {sortOrderUser == "descend" && (
              <ArrowDownwardIcon></ArrowDownwardIcon>
            )}

            <Button onClick={handleSortLikesUser}>いいね順</Button>
            {sortOrderUser == "likes_ascend" && (
              <ArrowUpwardIcon fontSize="small"></ArrowUpwardIcon>
            )}
            {sortOrderUser == "likes_descend" && (
              <ArrowDownwardIcon fontSize="small"></ArrowDownwardIcon>
            )}

            {sortedWishesUser.map((wish: any) => (
              <div key={wish.id} className={styles.postCard}>
                <Wish
                  wish={wish}
                  user={props.user}
                  domain={props.domain}
                ></Wish>
              </div>
            ))}
          </CustomTabPanel>
        )}
        {!props.user && (
          <CustomTabPanel value={value} index={1}>
            {/* // ユーザーがいない場合に表示させるパネル*/}
            <div>
              <p>
                ログインしてへんで！
                <br />
                いいねが保存されへんからログインかアカウント作るか
                <br />
                どっちかしてや！
              </p>
              <Button variant="contained">
                <Link href="/signin">signin</Link>
              </Button>
              <Button variant="contained">
                <Link href="/signup">signup</Link>
              </Button>
            </div>
          </CustomTabPanel>
        )}
      </Box>
    </div>
  );
};

export default WishList;