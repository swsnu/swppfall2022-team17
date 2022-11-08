import RegisterCafeForm from "components/forms/RegisterCafeForm";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import { NextPageWithLayout } from "pages/_app";

const RegisterCafe: NextPageWithLayout = () => {
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-4xl mb-8">카페 등록하기</h1>
      <h2 className="font-semibold text-2xl mb-8">사업자 등록증에 따라 아래 양식을 작성하세요</h2>
      <div className="md:w-96 w-full">
        <div className="mb-4">
          <RegisterCafeForm />
        </div>
      </div>
    </main>
  );
};

RegisterCafe.getLayout = (page) => (
  <RequireLogin>
    <CagoAdminHeader />
    <Container>{page}</Container>;
  </RequireLogin>
);

export default RegisterCafe;
