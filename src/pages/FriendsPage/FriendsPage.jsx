import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../../services/users.service'
import { AuthContext } from '../../context/auth.context'
import Loader from '../../components/Loader/Loader'
import './FriendsPage.css'

const FriendsPage = () => {

    const { user_id } = useParams()

    const [friends, setFriends] = useState([])
    const [newFriends, setNewFriends] = useState([])
    const [token, setToken] = useState("")

    const { getToken, isLoading } = useContext(AuthContext)

    const checkIfFriends = (id) => {
        const mappedFriends = newFriends.map(({ _id }) => _id)
        return mappedFriends.includes(id)
    }

    useEffect(() => {
        usersService
            .getFriends(user_id)
            .then(friends => {
                console.log("LOS FRIENDS", friends)
                setFriends(friends)
                setNewFriends(friends)
            })
            .catch(e => console.log(e))

        const token = getToken()
        setToken(token)
    }, [])

    const unfollowUser = (id) => {
        usersService
            .unfollowUser(id, token)
            .then((friends) => {
                setNewFriends(friends)
            })
            .catch(e => console.log(e))
    }

    const followUser = (id) => {
        usersService
            .followUser(id, token)
            .then((friends) => {
                setNewFriends(friends)
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            {
                !isLoading ?
                    < div className='friendsPage' >
                        {
                            friends.map(({ _id, avatar, username }) => {
                                return (
                                    <div key={_id}>
                                        <a href={`/profile/${_id}`} >
                                            <p>{username}</p>
                                            <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={avatar} alt="" />
                                        </a>
                                        {
                                            checkIfFriends(_id) ?
                                                <a onClick={() => unfollowUser(_id)} className="btn btn-dark">Unfollow</a>
                                                :
                                                <a onClick={() => followUser(_id)} className="btn btn-primary">Follow</a>
                                        }
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div >
                    :
                    <Loader />
            }
        </>
    )
}

export default FriendsPage