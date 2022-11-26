import RegisterCafeForm from "components/forms/RegisterCafeForm";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import { NextPageWithLayout } from "pages/_app";

const RegisterCafe: NextPageWithLayout = () => {
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-4xl mb-8">카페 등록하기</h1>
      <div className="md:w-96 w-full mb-4">
        <RegisterCafeForm />
      </div>
    </main>
  );
};

RegisterCafe.getLayout = (page) => (
  <RequireLogin>
    <Container>{page}</Container>
  </RequireLogin>
);

export default RegisterCafe;
