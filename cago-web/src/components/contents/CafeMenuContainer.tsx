import { Menu } from "lib/menu";
import Image from "next/image";

interface Props {
  category: string;
  menuList: Menu[];
  editable?: boolean;
}

const CafeMenuCard = ({ name, price, image }: Pick<Menu, "name" | "price" | "image">) => {
  return (
    <div className="text-center p-4 shadow-xl rounded-lg w-48 h-fit hover:scale-105 transition-transform">
      <Image src={image} alt="cafe-menu" width={160} height={160} className="mb-2" />
      <h5 className="font-semibold text-lg">{name}</h5>
      <h5>{price}원</h5>
    </div>
  );
};

const CafeMenuContainer = ({ category, menuList, editable }: Props) => {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-1">{category}</h2>
      <hr className="mb-3 border-t-slate-300" />
      <div className="flex flex-wrap gap-4 md:justify-start justify-center">
        {menuList.map((menu) => (
          <CafeMenuCard key={menu.id} name={menu.name} price={menu.price} image={menu.image} />
        ))}
        {menuList.length === 0 && <h4>메뉴가 없습니다!</h4>}
      </div>
    </div>
  );
};

export default CafeMenuContainer;
