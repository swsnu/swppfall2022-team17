import { Menu } from "lib/menu";
import Image from "next/image";

interface Props {
  menuList: Menu[];
}

const MenuSummary = ({ menuList: menuList }: Props) => {
  return (
    <main className="flex flex-col">
      <div className="m-2 y-1/2">
        {
          /* Check if main menu is existed */
          menuList.length === 0 ? (
            <>메뉴가 없습니다. 추가하려면 자세히 버튼을 눌러주세요.</>
          ) : (
            <>
              <div className="mb-4">
                메뉴를 추가 및 삭제 하려면 자세히 버튼을 눌러주세요
              </div>
              {/* Only main menu is shown cause it looks bad when too many information on the screen */}
              <div className="contained mb-2">대표메뉴</div>
              {/* className='scrollbar-hide' make scrollable without showing scorll bar. shift + scroll to scroll x-direction in pc */}
              <div className="flex flex-wrap justify-start">
                {menuList.map((menu) => {
                  return (
                    <div
                      key={`${menu.id} main container`}
                      className="bg-slate-50 hover:bg-slate-100 shadow-lg p-2 mb-2 w-1/6 flex flex-col justify-center"
                    >
                      <div>{menu.name}</div>
                      {menu.image && (
                        <Image
                          src={menu.image}
                          alt="main-menu"
                          width={180}
                          height={160}
                          className="mb-2 w-full"
                        />
                      )}
                      <div>{menu.price}원</div>
                    </div>
                  );
                })}
              </div>
            </>
          )
        }
      </div>
    </main>
  );
};

export default MenuSummary;
