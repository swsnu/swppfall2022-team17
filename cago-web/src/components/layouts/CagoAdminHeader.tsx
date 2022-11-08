import { logout } from "lib/auth";
import Link from "next/link";
import Container from "./Container";

const CagoAdminHeader = () => {
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
              <Link href="/admin/dashboard" className="font-extrabold text-3xl">
                Cago Admin
              </Link>
            </li>
          </ul>
          <ul className="flex gap-4">
            <li>
              <button
                className="font-semibold"
                onClick={(e) => handleLogoutButtonClick(e)}
              >
                로그아웃
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default CagoAdminHeader;
