import CreateProfileForm from "components/forms/CreateProfileForm";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import { useProfile } from "lib/profile";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { useEffect } from "react";

const CreateProfile: NextPageWithLayout = () => {
  const { hasProfile } = useProfile();
  const router = useRouter();
  const redirect = (router.query.redirect as string | undefined) ?? "/cafes";

  // Redirect if the user has profile.
  useEffect(() => {
    router.prefetch(redirect);

    if (hasProfile) {
      const { redirect: r, ...rest } = router.query;
      router.replace({ pathname: redirect, query: rest });
    }
  }, [hasProfile, redirect, router]);

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold text-4xl mb-8">당신의 프로필을 만드세요</h1>
      <div className="md:w-96 w-full mb">
        <CreateProfileForm />
      </div>
    </main>
  );
};

CreateProfile.getLayout = (page) => (
  <RequireLogin>
    <Container>{page}</Container>
  </RequireLogin>
);

export default CreateProfile;
