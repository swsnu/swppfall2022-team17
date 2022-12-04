import temp_article from 'components/contents/temp_data/temp_article.json'

interface article {
    id: number,
    cafe_id: number,
    title: string,
    content: string
}

const temp_board: article[] | undefined = temp_article
const BoardSummary = () => {
    return (
        <main>
            {temp_board && temp_board.map((board) => {
                return (
                    <div key={`${board.id} board container`} className='outline m-4 p-2'>
                        <div>
                            {board.title}
                        </div>
                        <div>
                            {board.content}
                        </div>
                    </div>
                )
            }) 
        }
        </main>
    )
}

export default BoardSummary;