import './HomePage.css'
import { useEffect } from 'react'
import CommentsService from '../../services/comments.service'

const HomePage = () => {

    return (
        <div className="HomePage">
            <a href="/register"><div className="HomeBtn" >Let's get Picky</div></a>
        </div>
    )
}

export default HomePage