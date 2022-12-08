import { Menu } from "lib/menu";
import Image from "next/image";

interface Props {
  menuList: Menu[];
}

const MenuSummary = ({ menuList: menuList }: Props) => {
  return (
    <div className="m-2 y-1/2">
      {
        /* Check if main menu is existed */
        menuList.length == 0 ? (
          <>메뉴가 없습니다. 추가하려면 자세히 버튼을 눌러주세요.</>
        ) : (
          <>
            <div className="mb-4">메뉴를 추가 및 삭제 하려면 자세히 버튼을 눌러주세요.</div>
            {/* Only main menu is shown cause it looks bad when too many information on the screen */}
            <h4 className="text-xl text-center font-semibold mb-2">대표메뉴</h4>
            {/* className='scrollbar-hide' make scrollable without showing scorll bar. shift + scroll to scroll x-direction in pc */}
            <div className="flex gap-4 overflow-auto scrollbar-hide">
              {menuList.map((menu) => {
                return (
                  <div
                    key={`menu-${menu.id}`}
                    className="shadow-lg p-2 my-2 min-w-fit flex flex-col rounded-lg justify-center text-center bg-white zoom"
                  >
                    <div>{menu.name}</div>
                    <hr className="my-1" />
                    <div className="relative h-36 w-36 my-2">
                      <Image src={menu.image} alt="main-menu" fill className="mb-2" />
                    </div>
                    <div>{menu.price}원</div>
                  </div>
                );
              })}
            </div>
          </>
        )
      }
    </div>
  );
};

export default MenuSummary;
