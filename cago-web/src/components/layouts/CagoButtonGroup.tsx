import Link from "next/link";
import { useRouter } from "next/router";

const CagoButtonGroup = () => {
  const router = useRouter();
  const path = router.pathname.split("/")[3];
  const ariaCurrentTrue = "py-2 px-4 text-sm font-semibold contained rounded-none min-w-fit";
  const ariaCurrentFalse = "py-2 px-4 text-sm font-semibold hover:bg-gray-50 min-w-fit";

  return (
    <nav className="flex backdrop-blur rounded-md ring-2 ring-black fixed bottom-6 left-1/2 -translate-x-1/2 shadow-2xl overflow-hidden min-w-fit">
      <Link
        href={`/cafes/${router.query.cafe_id}/info`}
        className={path === "info" ? ariaCurrentTrue : ariaCurrentFalse}
      >
        정보
      </Link>
      <Link
        href={`/cafes/${router.query.cafe_id}/menu`}
        className={path === "menu" ? ariaCurrentTrue : ariaCurrentFalse}
      >
        메뉴
      </Link>
      <Link
        href={`/cafes/${router.query.cafe_id}/reviews`}
        className={path === "reviews" ? ariaCurrentTrue : ariaCurrentFalse}
      >
        리뷰
      </Link>
      <Link
        href={`/cafes/${router.query.cafe_id}/board`}
        className={path === "board" ? ariaCurrentTrue : ariaCurrentFalse}
      >
        공지
      </Link>
    </nav>
  );
};

export default CagoButtonGroup;
