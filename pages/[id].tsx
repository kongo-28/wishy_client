import React from "react";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import Wish from "@/components/Wish";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/wishes");

const UserProfile = (props: any) => {
  return (
    <div className={styles.main}>
      {" "}
      <ResponsiveAppBar />
      <div>ユーザープロフィールページ</div>
      <div>
        {props.wishes.map((wish: any) => (
          <div key={wish.id} className={styles.postCard}>
            <Wish wish={wish} user={props.user}></Wish>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
