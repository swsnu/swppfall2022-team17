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
                            <div className="mb-4">메뉴를 '추가' 및 '삭제' 하려면 '자세히' 버튼을 눌러주세요.</div>
                            <div className="contained mb-2">대표메뉴</div>
                            <div className="flex overflow-auto scrollbar-hide">
                                {mainMenuList.map((mainMenu) => {
                                    return (
                                        <div key={`${mainMenu.id} main container`} className='shadow-lg m-2 w-full min-w-fit flex flex-col justify-center'>
                                            <div>{mainMenu.name}</div>
                                            {mainMenu.image && <img src={mainMenu.image} className='h-44' />}
                                            <div>{mainMenu.price}원</div>
                                        </div>
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