import { useParams } from 'react-router-dom'
import './FriendsPage.css'

const FriendsPage = () => {

    const { user_id } = useParams()

    return (
        <div>FriendsPage</div>
    )
}

export default FriendsPage