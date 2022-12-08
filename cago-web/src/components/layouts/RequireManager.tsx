import { useAuth } from "lib/auth";
import { useCafe } from "lib/cafe";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
}

const RequireManager = ({ children }: Props) => {
  const { user } = useAuth();

  const router = useRouter();
  const { cafe } = useCafe(router.query.cafe_id as string);

  const redirect = "/admin/dashboard";
  const is_manager = user && cafe?.is_managed && cafe.managers.includes(user.id);

  useEffect(() => {
    router.prefetch(redirect);

    // Replace to dashboard page if the user is not a manager.
    if (user && cafe?.is_managed) {
      if (!cafe.managers.includes(user.id)) {
        router.replace({ pathname: redirect });
      }
    }
  }, [router, user, cafe]);

  // Prevent rendering the children while validating.
  return <>{is_manager && children}</>;
};

export default RequireManager;
