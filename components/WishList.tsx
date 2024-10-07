import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Wish from "@/components/Wish";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

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

  return (
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
              <Wish wish={wish} user={props.user} domain={props.domain}></Wish>
            </div>
          ))}
        </CustomTabPanel>
        {props.user && (
          <CustomTabPanel value={value} index={1}>
            {props.wishes_user.map((wish: any) => (
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
        <CustomTabPanel value={value} index={2}>
          Coming soon...
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default WishList;
