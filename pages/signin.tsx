import SignIn from "@/components/sign-in/SignIn";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const domain: string = process.env.DOMAIN_NAME!;
  return {
    props: {
      domain,
    },
  };
};

const signIn = (props: { disableCustomTheme?: boolean; domain: string }) => {
  return (
    <div>
      <ResponsiveAppBar />
      <SignIn domain={props.domain} />
    </div>
  );
};

export default signIn;
