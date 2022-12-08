import CafeMenuContainer from "components/contents/CafeMenuContainer";
import CreateMenuForm from "components/forms/CreateMenuForm";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import { useMenu } from "lib/menu";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { useState } from "react";

const DashboardMenu: NextPageWithLayout = () => {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { mainMenuList, categorizedMenuList } = useMenu(cafeId);

  const [showAddMenuModal, setShowAddMenuModal] = useState<boolean>(false);

  return (
    <main>
      {/* Add menu button */}
      <div className="w-full text-right mt-8 mb-2">
        <button className="contained" onClick={(e) => setShowAddMenuModal(true)}>
          메뉴 추가하기
        </button>
      </div>

      {/* Main menu */}
      <div className="mb-8">
        <CafeMenuContainer category="대표 메뉴" menuList={mainMenuList} editable cafeId={parseInt(cafeId)} />
      </div>

      {/* Categorized menu */}
      {categorizedMenuList.map((list) => (
        <div key={list.category} className="mb-8">
          <CafeMenuContainer
            category={list.category}
            menuList={list.menuList}
            editable
            cafeId={parseInt(cafeId)}
          />
        </div>
      ))}

      {/* Modal to add a menu */}
      {showAddMenuModal && (
        <>
          <div className="p-6 absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 bg-slate-50 shadow-lg rounded-lg z-50">
            <CreateMenuForm cafeId={parseInt(cafeId)} onSuccess={() => setShowAddMenuModal(false)} />
          </div>

          {/* Below overlaps the entire screen, and close the model if clicked. */}
          <div
            data-testid="modal-overlay"
            className="opacity-50 backdrop-brightness-50 fixed top-0 bottom-0 left-0 right-0"
            onClick={(e) => setShowAddMenuModal(false)}
          />
        </>
      )}
    </main>
  );
};

DashboardMenu.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default DashboardMenu;
