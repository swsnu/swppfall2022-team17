import temp_article from 'components/contents/temp_data/temp_article.json'

interface article {
    id: number,
    cafe_id: number,
    title: string,
    content: string
}

/* Todo: Work with api */
const temp_board: article[] | undefined = temp_article
const BoardSummary = () => {
    return (
        /* 
            showing all board
            Todo: When board length goes to large it sould show some of the boards
        */
        <main>
            {temp_board ?
                <>
                    <div>공지사항을 '추가' 및 '삭제' 하려면 '자세히' 버튼을 눌러주세요. </div>
                    <div className='flex overflow-auto scrollbar-hide'>
                        {temp_board.map((board) => {
                            return (
                                <div key={`${board.id} board container`} className='outlined m-4 min-w-fit'>
                                    <div className='text-left text-sm'>
                                        {board.title}
                                    </div>
                                    <div className='text-lg'>
                                        {board.content}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </>
                :
                <div>공지사항이 없습니다. 추가하려면 '자세히' 버튼을 눌러주세요</div>}
        </main>
    )
}

export default BoardSummary;