import LoginForm from "components/forms/LoginForm";
import Container from "components/layouts/Container";
import { useRequireLogout } from "lib/auth";
import Link from "next/link";
import { NextPageWithLayout } from "pages/_app";

const Login: NextPageWithLayout = () => {
  useRequireLogout("/cafes");

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-4xl mb-8">Welcome Back!</h1>
      <div className="md:w-96 w-full">
        <div className="mb-4">
          <LoginForm />
        </div>
        <Link href="/auth/signup" className="block w-fit ml-auto underline underline-offset-2">
          회원가입
        </Link>
      </div>
    </main>
  );
};

Login.getLayout = (page) => <Container>{page}</Container>;

export default Login;
