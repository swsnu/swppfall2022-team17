import { useMenu } from "lib/menu";
import Image from "next/image"

interface SummaryProps {
    cafe_id: string;
}

const MenuSummary = ({ cafe_id }: SummaryProps) => {
    const { mainMenuList } = useMenu(cafe_id)
    return (
        <main className="flex flex-col">
            <div className="m-2 y-1/2">
                {
                    /* Check if main menu is existed */
                    mainMenuList.length == 0 ?
                        <>메뉴가 없습니다. 추가하려면 '자세히' 버튼을 눌러주세요.</>
                        :
                        <>
                            <div className="mb-4">메뉴를 '추가' 및 '삭제' 하려면 '자세히' 버튼을 눌러주세요.</div>
                            {/* Only main menu is shown cause it looks bad when too many information on the screen */}
                            <div className="contained mb-2">대표메뉴</div>
                            {/* className='scrollbar-hide' make scrollable without showing scorll bar. shift + scroll to scroll x-direction in pc */}
                            <div className="flex overflow-auto scrollbar-hide">
                                {mainMenuList.map((mainMenu) => {
                                    return (
                                        <div key={`${mainMenu.id} main container`} className='shadow-lg m-2 min-w-fit flex flex-col justify-center'>
                                            <div>{mainMenu.name}</div>
                                            {mainMenu.image && <Image src={mainMenu.image} alt="main-menu" width={180} height={160} className="mb-2" />}
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