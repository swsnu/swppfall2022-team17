import MenuContainer from "components/contents/MenuContainer";
import CagoButtonGroup from "components/layouts/CagoButtonGroup";
import CagoHeader from "components/layouts/CagoHeader";
import Container from "components/layouts/Container";
import RequireProfile from "components/layouts/RequireProfile";
import { useMenu } from "lib/menu";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const CafeMenu: NextPageWithLayout = () => {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { mainMenuList, categorizedMenuList } = useMenu(cafeId);

  return (
    <main>
      {/* Main menu */}
      <div className="my-8">
        <MenuContainer category="대표 메뉴" menuList={mainMenuList} />
      </div>

      {/* Categorized menu */}
      {categorizedMenuList.map((list) => (
        <div key={list.category} className="mb-8">
          <MenuContainer category={list.category} menuList={list.menuList} />
        </div>
      ))}
    </main>
  );
};

CafeMenu.getLayout = (page) => (
  <RequireProfile>
    <CagoHeader />
    <Container>
      {page}
      <CagoButtonGroup />
    </Container>
  </RequireProfile>
);

export default CafeMenu;
