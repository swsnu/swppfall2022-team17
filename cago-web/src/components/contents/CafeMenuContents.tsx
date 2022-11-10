import React from "react";
import ContentSection from "./ContentSection";
import MenuContents from "components/contents/MenuContents";
import menuData from "data/menus.json";
import { NextComponentType } from "next";

const CafeMenuContents: NextComponentType = () => {
  return (
    <>
      <ContentSection title="대표 메뉴">
        <div className="overflow-x-auto h-56 flex">
          {menuData.map((menu) => {
            return (
              <>{menu.is_representative && <MenuContents menu={menu} />}</>
            );
          })}
        </div>
      </ContentSection>
      <ContentSection title="전체 메뉴">
        <div className="overflow-x-auto h-56 flex">
          {menuData.map((menu) => {
            return <MenuContents menu={menu} />;
          })}
        </div>
      </ContentSection>
    </>
  );
};

export default CafeMenuContents;
