import { useAuth } from "lib/auth";
import { useProfile } from "lib/profile";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
}

const RequireProfile = ({ children }: Props) => {
  const { loading: profileLoading, hasProfile } = useProfile();
  const { loading: authLoading, loggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!!user && !profileLoading && !hasProfile) {
      router.replace({ pathname: "/create-profile", query: { redirect: router.asPath } });
    }
  }, [user, profileLoading, hasProfile, router]);

  return <>{(hasProfile || (!authLoading && !loggedIn)) && children}</>;
};

export default RequireProfile;
