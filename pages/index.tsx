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
      <ResponsiveAppBar />
      {props.user && (
        // ユーザーがいる場合に表示させるコンポーネント
        <div>{props.user.email}でログイン中</div>
      )}
      {!props.user && (
        // ユーザーがいない場合に表示させるコンポーネント
        <div>未ログインです</div>
      )}
      <div>
        <Link href="http://localhost:3001/signin">signin</Link>
      </div>
      <div>
        <Link href="http://localhost:3001/signup">signup</Link>
      </div>
      <div>
        {props.wishes.map((wish: any) => (
          <Wish wish={wish}></Wish>
        ))}
      </div>
    </div>
  );
};

export default Home;
