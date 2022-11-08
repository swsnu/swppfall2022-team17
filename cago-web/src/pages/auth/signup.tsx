import SignUpForm from "components/forms/SignUpForm";
import Container from "components/layouts/Container";
import RequireLogout from "components/layouts/RequireLogout";
import { NextPageWithLayout } from "pages/_app";

const SignUp: NextPageWithLayout = () => {
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

SignUp.getLayout = (page) => (
  <RequireLogout>
    <Container>{page}</Container>;
  </RequireLogout>
);

export default SignUp;
