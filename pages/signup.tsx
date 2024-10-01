import SignUp from "@/components/sign-in/SignUp";
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

const signUp = (props: { disableCustomTheme?: boolean; domain: string }) => {
  return (
    <div>
      <ResponsiveAppBar />
      <SignUp domain={props.domain} />
    </div>
  );
};

export default signUp;
