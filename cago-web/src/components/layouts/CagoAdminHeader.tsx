import { logout } from "lib/auth";
import Link from "next/link";
import Container from "./Container";
import { useCafe } from "../../lib/cafe";
import OpenToggleSwitch from "components/layouts/OpenToggleSwitch";
import { useRouter } from "next/router";

const CagoAdminHeader = () => {
  const router = useRouter();
  const query = router.query.id;
  const detail = typeof query === "string";
  const cafe_id = detail ? query : "-1";

  const { cafe } = useCafe(cafe_id);

  const handleLogoutButtonClick: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <header className="sticky top-0 shadow-md bg-opacity-70 backdrop-blur z-50">
      <Container>
        <ul className="flex items-center h-16 py-3">
          <li className="float-left w-1/3 text-left">
            <Link href="/admin/dashboard" className="font-extrabold text-3xl">
              Cago Admin
            </Link>
          </li>
          <li className="float-left w-1/3 text-center">
            {detail && cafe !== undefined && (
              <ul>
                <li>
                  <Link
                    href={`/admin/dashboard/${cafe.id}`}
                    className="font-extrabold text-xl m-auto"
                  >
                    {cafe.name}
                  </Link>
                </li>
                <li className="font-bold text-sm clear-both m-auto">
                  # of likes
                </li>
              </ul>
            )}
          </li>
          <li className="float-left w-1/3 text-right">
            <ul>
              <li>
                <button
                  className="float-right font-semibold mt-1 ml-2"
                  onClick={(e) => handleLogoutButtonClick(e)}
                >
                  로그아웃
                </button>
              </li>
              {detail && cafe !== undefined && (
                <>
                  <li className="float-right">
                    <OpenToggleSwitch {...cafe} />
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default CagoAdminHeader;
