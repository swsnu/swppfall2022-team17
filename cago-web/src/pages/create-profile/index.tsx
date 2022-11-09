import CreateProfileForm from "components/forms/CreateProfileForm";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import { NextPageWithLayout } from "pages/_app";

const CreateProfile: NextPageWithLayout = () => {
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-4xl mb-8">당신의 프로필을 만드세요</h1>
      <div className="md:w-96 w-full mb">
        <CreateProfileForm />
      </div>
    </main>
  );
};

CreateProfile.getLayout = (page) => {
  return (
    <RequireLogin>
      <Container>{page}</Container>
    </RequireLogin>
  );
};

export default CreateProfile;
