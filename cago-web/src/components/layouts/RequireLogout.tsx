import { useAuth } from "lib/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
}

const RequireLogout = ({ children }: Props) => {
  const { loading, loggedIn } = useAuth();

  const router = useRouter();

  // Redirect path should be in the query parameters. Fallback is index page.
  const redirect = (router.query.redirect as string | undefined) ?? "/cafes";

  useEffect(() => {
    router.prefetch(redirect);

    if (loggedIn) {
      const { redirect: r, ...rest } = router.query;
      router.replace({ pathname: redirect, query: rest });
    }
  }, [loggedIn, redirect, router]);

  // Prevent rendering the children while loading or logged in.
  return <>{!loading && !loggedIn && children}</>;
};

export default RequireLogout;
