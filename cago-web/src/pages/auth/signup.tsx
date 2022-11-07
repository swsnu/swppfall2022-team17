import SignUpForm from "components/forms/SignUpForm";
import Container from "components/layouts/Container";
import { useRequireLogout } from "lib/auth";
import { NextPageWithLayout } from "pages/_app";

const SignUp: NextPageWithLayout = () => {
  useRequireLogout("/cafes");

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-4xl mb-8">Welcome to Cago!</h1>
      <div className="md:w-96 w-full">
        <div className="mb-4">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
};

SignUp.getLayout = (page) => <Container>{page}</Container>;

export default SignUp;
