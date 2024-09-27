import { GetServerSideProps } from "next";

export const withAuthServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const { req, res } = context;

    const uid = req.cookies?.["uid"] || "";
    const client = req.cookies?.["client"] || "";
    const accessToken = req.cookies?.["access-token"] || "";

    const headers = new Headers({
      "Content-Type": "application/json",
      uid: uid,
      client: client,
      "access-token": accessToken,
    });

    const response = await fetch(`http://localhost:3000${url}`, {
      headers: headers,
    });
    if (!response.ok && response.status === 401) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }
    // TODO: 他にも500エラーを考慮した分岐も必要
    const props = await response.json();
    return { props };
  };
};
