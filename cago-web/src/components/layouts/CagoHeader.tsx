import { logout, useAuth } from "lib/auth";
import { useCafe } from "lib/cafe";
import { useProfile } from "lib/profile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { getCagoRequest } from "utils";
import Container from "./Container";

const CagoHeader = () => {
  const { loading, loggedIn, user } = useAuth();
  const { profile } = useProfile();
  const router = useRouter();
  const { data: cafe } = useCafe(router.query.cafe_id);

  const handleLogoutButtonClick: React.MouseEventHandler = async (e) => {
    e.preventDefault();

    await logout();
  };

  const handleToggleLike = async () => {
    if (cafe?.is_managed && user) {
      if ((cafe as any)?.is_liked) {
        await getCagoRequest("delete", user.token)("/like/", { cafe: cafe.id });
        mutate(`/cafes/${cafe.id}/`);
      } else {
        await getCagoRequest("post", user.token)("/like/", { cafe: cafe.id });
        mutate(`/cafes/${cafe.id}/`);
      }
    }
  };

  return (
    <header className="sticky top-0 shadow-md bg-opacity-70 backdrop-blur z-50">
      <Container>
        <nav className="flex justify-between items-center h-16 py-3">
          <ul>
            <li>
              <Link href="/cafes" className="font-extrabold sm:text-3xl text-xl">
                Cago
              </Link>
            </li>
          </ul>
          {cafe?.is_managed && (
            <ul className="flex gap-2 sm:text-xl text-md font-bold">
              <li>
                <Link href={`/cafes/${cafe.id}/info`}>{cafe.name}</Link>
              </li>
              {loggedIn && (
                <li>
                  <button
                    onClick={(e) => {
                      handleToggleLike();
                    }}
                  >
                    {(cafe as any)?.is_liked ? "♥" : "♡"}
                  </button>
                </li>
              )}
            </ul>
          )}
          <ul className="flex gap-6 items-center">
            {loggedIn && (
              <>
                <li>
                  <button className="font-semibold h-full" onClick={(e) => handleLogoutButtonClick(e)}>
                    로그아웃
                  </button>
                </li>
                {profile && (
                  <li className="relative w-10 h-10">
                    <Image
                      src={profile.avatar}
                      alt="profile-avatar"
                      fill
                      className="mx-auto rounded-full border border-slate-800 h-full"
                    />
                  </li>
                )}
              </>
            )}
            {!loading && !loggedIn && (
              <>
                <li>
                  <Link
                    href={{ pathname: "/auth/login", query: { ...router.query, redirect: router.pathname } }}
                    className="font-semibold contained"
                  >
                    로그인
                  </Link>
                </li>
                <li>
                  <Link
                    href={{ pathname: "/auth/signup", query: { ...router.query, redirect: router.pathname } }}
                    className="font-semibold"
                  >
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default CagoHeader;
