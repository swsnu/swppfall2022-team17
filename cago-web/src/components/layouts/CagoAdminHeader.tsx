import CafeToggleSwitch from "components/contents/CafeToggleSwitch";
import { logout } from "lib/auth";
import { useCafe } from "lib/cafe";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "./Container";

const CagoAdminHeader = () => {
  const router = useRouter();
  const { cafe } = useCafe(router.query.cafe_id as string);

  const handleLogoutButtonClick: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <header className="sticky top-0 shadow-md bg-opacity-70 backdrop-blur z-50">
      <Container>
        <nav className="flex justify-between items-center h-16 py-3">
          {/* Logo, name, and likes */}
          <ul className="flex items-center">
            <li>
              <Link href="/admin/dashboard" className="font-extrabold text-3xl leading-7">
                Cago Admin
              </Link>
            </li>
            {cafe?.is_managed && (
              <>
                <li className="ml-8 ">
                  <Link href={`/admin/dashboard/${cafe.id}`} className="text-xl font-bold">
                    {cafe.name}
                  </Link>
                </li>
                <li className="ml-2 text-xl font-bold">♡ {cafe.num_likes}</li>
              </>
            )}
          </ul>

          {/* Toggle & Logout */}
          <ul className="flex gap-4 items-center">
            {cafe?.is_managed && (
              <li className="text-lg">
                <CafeToggleSwitch cafe={cafe} />
              </li>
            )}
            <li>
              <button className="font-semibold" onClick={(e) => handleLogoutButtonClick(e)}>
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
