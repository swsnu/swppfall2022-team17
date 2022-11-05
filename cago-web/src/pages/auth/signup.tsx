import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";

const SignUp: NextPageWithLayout = () => {
  return (
    <main>
      <h1>Welcome to Cago!</h1>
    </main>
  );
};

SignUp.getLayout = (page) => <Container>{page}</Container>;

export default SignUp;
