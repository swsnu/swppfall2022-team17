import { useMenu } from "lib/menu";

interface CafeMenuProps {
    id: number;
    name: string;
    price: number;
    image?: string;
}

interface SummaryProps {
    cafe_id: string;
}

/* Individual Menu  */
const MenuDetail = (menu: CafeMenuProps) => {
    return (
        <div className='shadow-lg m-2 w-full min-w-fit flex flex-col justify-center'>
            <div>{menu.name}</div>
            {menu.image && <img src={menu.image} className='h-44' />}
            <div>{menu.price}원</div>
        </div>
    )
}

const MenuSummary = ({ cafe_id }: SummaryProps) => {
    const { mainMenuList } = useMenu(cafe_id)
    console.log(mainMenuList)
    return (
        <main className="flex flex-col">
            <div className="m-2 y-1/2">
                {
                    mainMenuList.length == 0 ?
                        <>메뉴가 없습니다. 추가하려면 '자세히' 버튼을 눌러주세요.</>
                        :
                        <>
                            <div className="contained mb-2">대표메뉴</div>
                            <div className="flex overflow-auto scrollbar-hide">
                                {mainMenuList.map((mainMenu) => {
                                    return (
                                        <MenuDetail key={`${mainMenu.id} main container`} id={mainMenu.id} name={mainMenu.name} price={mainMenu.price} image={mainMenu.image} />
                                    )
                                })}
                            </div>
                        </>
                }
            </div>
        </main>
    )
}

export default MenuSummary