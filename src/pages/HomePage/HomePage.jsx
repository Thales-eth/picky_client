import './HomePage.css'
import CommentsService from '../../services/comments.service'
import { useEffect } from 'react'


const HomePage = () => {

    return (
        <div className="HomePage">
            <a href="/register"><div className="HomeBtn" >Let's get Picky</div></a>
        </div>
    )
}

export default HomePage