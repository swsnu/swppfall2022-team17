import { useAuth } from "lib/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
}

const RequireLogin = ({ children }: Props) => {
  const { loading, loggedIn } = useAuth();

  const router = useRouter();
  const redirect = "/auth/login";

  useEffect(() => {
    router.prefetch(redirect);

    if (!loading && !loggedIn) {
      // Redirect while setting the current path as a query parameter.
      router.replace({ pathname: redirect, query: { redirect: router.asPath } });
    }
  }, [loading, loggedIn, router]);

  // Prevent rendering the children while not logged in.
  return <>{loggedIn && children}</>;
};

export default RequireLogin;
