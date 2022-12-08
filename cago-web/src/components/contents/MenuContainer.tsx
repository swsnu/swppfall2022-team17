import { useAuth } from "lib/auth";
import { deleteMenu, Menu } from "lib/menu";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

interface ReadOnlyProps {
  category: string;
  menuList: Menu[];
  editable?: false;
}

interface EditableProps extends Omit<ReadOnlyProps, "editable"> {
  editable: true;
  cafeId: number;
}

interface CardProps {
  name: string;
  price: number;
  image: string;
  editable?: boolean;
  onDelete?: () => void;
}

const CafeMenuCard = (props: CardProps) => {
  const { name, price, image } = props;

  return (
    <div className="relative text-center p-4 shadow-xl rounded-lg w-48 h-fit hover:scale-105 transition-transform">
      <Image src={image} alt="cafe-menu" width={160} height={160} className="mb-2" />
      <h5 className="font-semibold text-lg">{name}</h5>
      <h5>{price}원</h5>

      {/* Display delete button on top-right corner, if editable. */}
      {props.editable && (
        <button
          className="absolute top-0 right-0 p-2 leading-4 text-red-700 z-50"
          onClick={(e) => {
            props.onDelete?.();
          }}
        >
          <IoMdClose className="text-red-900" />
        </button>
      )}
    </div>
  );
};

const MenuContainer = (props: ReadOnlyProps | EditableProps) => {
  const { category, menuList, editable } = props;
  const { user } = useAuth();

  const handleDelete = async (menuId: number) => {
    if (user && editable) {
      await deleteMenu(props.cafeId, menuId, user.token);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-1">{category}</h2>
      <hr className="mb-3 border-t-gray-300" />
      <div className="flex flex-wrap gap-4 md:justify-start justify-center">
        {menuList.map((menu) => (
          <CafeMenuCard
            key={menu.id}
            name={menu.name}
            price={menu.price}
            image={menu.image}
            editable={editable}
            onDelete={() => handleDelete(menu.id)}
          />
        ))}
        {menuList.length === 0 && <h4>메뉴가 없습니다!</h4>}
      </div>
    </div>
  );
};

export default MenuContainer;
