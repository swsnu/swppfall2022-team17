import { logout, useAuth } from "lib/auth";
import Link from "next/link";
import Container from "./Container";

const CagoHeader = () => {
  const { loading, loggedIn } = useAuth();

  const handleLogoutButtonClick: React.MouseEventHandler = async (e) => {
    e.preventDefault();

    await logout();
  };

  return (
    <header className="sticky top-0 shadow-md bg-opacity-70 backdrop-blur z-50">
      <Container>
        <nav className="flex justify-between items-center h-16 py-3">
          <ul>
            <li>
              <Link href="/cafes" className="font-extrabold text-3xl">
                Cago
              </Link>
            </li>
          </ul>
          <ul className="flex gap-4">
            {loggedIn && (
              <li>
                <button className="font-semibold" onClick={(e) => handleLogoutButtonClick(e)}>
                  로그아웃
                </button>
              </li>
            )}
            {!loading && !loggedIn && (
              <>
                <li>
                  <Link
                    href={{ pathname: "/auth/login", query: { redirect: "/cafes" } }}
                    className="font-semibold contained"
                  >
                    로그인
                  </Link>
                </li>
                <li>
                  <Link
                    href={{ pathname: "/auth/signup", query: { redirect: "/cafes" } }}
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
