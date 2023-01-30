import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../../services/users.service'
import { AuthContext } from '../../context/auth.context'
import Loader from '../../components/Loader/Loader'
import AvatarImage from '../../components/Avatar/Avatar'
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
                    < div className='friendsPage mt-5' >
                        {
                            friends.map(({ _id, avatar, username }) => {
                                return (
                                    <>
                                        <div className='FriendGrid' key={_id}>
                                            <a href={`/profile/${_id}`} >
                                                <div className='InfoBlock'>
                                                    <AvatarImage src={avatar} />
                                                    <p className='ms-3'>{username}</p>
                                                </div>
                                            </a>
                                            {
                                                checkIfFriends(_id) ?
                                                    <a onClick={() => unfollowUser(_id)} className="UnfollowBtn btn btn-light me-3">Unfollow</a>
                                                    :
                                                    <a onClick={() => followUser(_id)} className="FollowBtn btn btn-primary me-3">Follow</a>
                                            }
                                        </div>
                                        < hr />
                                    </>
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