import RegisterCafeForm from "components/forms/RegisterCafeForm";
import Container from "components/layouts/Container";
import { useRequireLogin } from "lib/auth";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const RegisterCafe: NextPageWithLayout = () => {
  const router = useRouter();
  const redirect = (router.query?.redirect as string) || "/auth/login";     //todo login page of admin...query param?
  useRequireLogin(redirect);

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-4xl mb-8">Register Your Cafe</h1>
      <h2 className="font-semibold text-2xl mb-8">Fill in the form below based on your business license</h2>
      <div className="md:w-96 w-full">
        <div className="mb-4">
          <RegisterCafeForm />
        </div>
      </div>
    </main>
  );
};

RegisterCafe.getLayout = (page) => <Container>{page}</Container>;

export default RegisterCafe;
