import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/lib/auth";

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps("/wishes");

const Home = (props: any) => {
  return (
    <div>
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
      <div>--------------------------------------------</div>
      <div>
        {props.wishes.map((wish: any) => (
          <div key={wish.id}>
            <p>{wish.title}</p>
            <p>{wish.content}</p>
            <button>HOT!</button>
            <div>---------------------------------------</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
