import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import styles from "@/styles/Home.module.css";
import Wish from "@/components/Wish";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/wishes");

const Home = (props: any) => {
  return (
    <div className={styles.main}>
      <ResponsiveAppBar domain={props.domain} />
      {props.user && (
        // ユーザーがいる場合に表示させるコンポーネント
        <div>{props.user.email}でログイン中</div>
      )}
      {!props.user && (
        // ユーザーがいない場合に表示させるコンポーネント
        <div>
          <p>
            未ログインです
            <br />
            いいねは保存されません
          </p>
          <div>
            <Link href="/signin">signin</Link>
          </div>
          <div>
            <Link href="/signup">signup</Link>
          </div>
        </div>
      )}

      <div className={styles.wishcontainer}>
        {props.wishes.map((wish: any) => (
          <div key={wish.id} className={styles.postCard}>
            <Wish wish={wish} user={props.user} domain={props.domain}></Wish>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
