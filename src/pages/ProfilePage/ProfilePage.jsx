import './ProfilePage.css'
import { Toast } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { useEffect, useContext, useState } from 'react'
import PhotosService from '../../services/photos.service'
import usersService from '../../services/users.service'
import Loader from '../../components/Loader/Loader'
import AvatarImage from '../../components/Avatar/Avatar'
import StandardImageList from '../../components/ImageGrid/ImageGrid'

const ProfilePage = () => {

    const { user_id } = useParams()

    const { user, isLoading, getToken } = useContext(AuthContext)
    const [profileUser, setProfileUser] = useState({ _id: "", avatar: "", username: "", email: "", friends: [] })

    const { avatar, username, email } = profileUser

    const [token, setToken] = useState("")

    const [personalPhotos, setPersonalPhotos] = useState([])

    const [friends, setFriends] = useState([])
    const [newFriends, setNewFriends] = useState([])

    const checkIfFriends = (id) => {
        const mappedFriends = newFriends.map(({ _id }) => _id)
        return mappedFriends.includes(id)
    }

    useEffect(() => {

        user &&
            usersService
                .getFriends(user._id)
                .then(friends => {
                    setNewFriends(friends)
                    setFriends(friends)
                })
                .catch(e => console.log(e))

        user &&
            usersService
                .getOneUser(user_id)
                .then(user => setProfileUser(user))
                .catch(e => console.log(e))

        user && PhotosService
            .getPersonalPhotos(user_id)
            .then(photos => setPersonalPhotos(photos))
            .catch(e => console.log(e))

        const token = getToken()
        setToken(token)
    }, [user])

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
                isLoading ? <Loader />
                    :
                    <div className='ProfilePage'>
                        <div className="basicInfo mt-5">
                            <AvatarImage src={avatar} />
                            <h1 className='mt-3'>Username: {username}</h1>
                            <h1>📧: {email}</h1>
                            <div className='UserButtons'>
                                <a className='mt-3 btn btn-light' href={`/friends/${user_id}`}>Friends ({profileUser?.friends.length})</a>
                                {/* user_id !== user._id */}
                                {
                                    checkIfFriends(user_id) ?
                                        <a className='mt-3 btn ms-2 btn-light' onClick={() => unfollowUser(user_id)}>Unfollow</a>
                                        :
                                        <a className='mt-3 ms-2 btn btn-primary' onClick={() => followUser(user_id)}>Follow</a>
                                }
                            </div>
                        </div>
                        <hr />
                        <p>Personal photos:</p>
                        <StandardImageList items={personalPhotos} cols={3} />
                        <Toast />
                    </div>
            }
        </>
    )
}

export default ProfilePage