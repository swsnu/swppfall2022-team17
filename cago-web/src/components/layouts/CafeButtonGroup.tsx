import Link from "next/link";
import { useRouter } from "next/router";

const CafeButtonGroup = () => {
  const router = useRouter();
  const path = router.pathname.split("/")[3];
  const ariaCurrentTrue = "py-2 px-4 rounded-md text-sm font-semibold contained";
  const ariaCurrentFalse = "py-2 px-4 rounded-md text-sm font-semibold bg-white hover:bg-slate-50";

  return (
    <nav className="inline-flex rounded-md ring-2 ring-black fixed bottom-6 left-1/2 -translate-x-1/2 shadow-2xl">
      <Link
        href={`/cafes/${router.query.id}/info`}
        className={path === "info" ? ariaCurrentTrue : ariaCurrentFalse}
      >
        정보
      </Link>
      <Link
        href={`/cafes/${router.query.id}/menu`}
        className={path === "menu" ? ariaCurrentTrue : ariaCurrentFalse}
      >
        메뉴
      </Link>
      <Link
        href={`/cafes/${router.query.id}/reviews`}
        className={path === "reviews" ? ariaCurrentTrue : ariaCurrentFalse}
      >
        리뷰
      </Link>
      <Link
        href={`/cafes/${router.query.id}/board`}
        className={path === "board" ? ariaCurrentTrue : ariaCurrentFalse}
      >
        게시판
      </Link>
    </nav>
  );
};

export default CafeButtonGroup;
