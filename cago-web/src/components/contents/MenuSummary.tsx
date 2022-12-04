import { getCagoRequest } from "utils"
import temp_menu from "components/contents/temp_data/temp_menu.json"

interface CafeMenuProps {
    id: number;
    name: string;
    price: string;
    image?: string;
}

const MenuDetail = (menu: CafeMenuProps) => {
    return (
        <div key={`${menu.id}container`} className='min-w-fit flex flex-col justify-center'>
            <div>{menu.name}</div>
            {menu.image && <img src={menu.image}></img>}
            <div>{menu.price}원</div>
        </div>
    )
}

const MenuSummary = () => {
    return (
        <main className="flex flex-col">
            <div className="outlined m-2 y-1/2">
                <div className="contained">대표메뉴</div>
                <div className="flex overflow-auto scrollbar-hide">
                    {temp_menu.map((menu) => {
                        return (
                            menu.is_main &&
                            <MenuDetail id={menu.id} name={menu.name} price={menu.price} image={menu.image}/>
                        )
                    })}
                </div>
            </div>
            <div className="outlined m-2 y-1/2">
                <div className="contained">전체메뉴</div>
                <div className="grid grid-cols-3 gap-4">
                    {temp_menu.map((menu) => {
                        return (
                            <MenuDetail id={menu.id} name={menu.name} price={menu.price} image={menu.image}/>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default MenuSummary