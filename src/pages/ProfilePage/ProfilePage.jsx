import './ProfilePage.css'
import { Toast } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { useEffect, useContext, useState } from 'react'
import PhotosService from '../../services/photos.service'
import usersService from '../../services/users.service'
import Loader from '../../components/Loader/Loader'
import AvatarImage from '../../components/Avatar/Avatar'

const ProfilePage = () => {

    const { user_id } = useParams()

    const { user, isLoading } = useContext(AuthContext)
    const [profileUser, setProfileUser] = useState({ _id: "", avatar: "", username: "", email: "", friends: [] })

    const [personalPhotos, setPersonalPhotos] = useState([])

    const { avatar, username, email } = profileUser

    useEffect(() => {

        user &&
            usersService
                .getOneUser(user_id)
                .then(user => setProfileUser(user))
                .catch(e => console.log(e))

        user && PhotosService
            .getPersonalPhotos(user_id)
            .then(photos => setPersonalPhotos(photos))
            .catch(e => console.log(e))
    }, [user])

    return (
        <>
            {
                isLoading ? <Loader />
                    :
                    <div className='ProfilePage'>
                        <AvatarImage src={avatar} />
                        <h1>Username: {username}</h1>
                        <h1>📧: {email}</h1>
                        <a className='ml-5 btn' href={`/friends/${user_id}`}>Friends ({profileUser?.friends.length})</a>
                        <p>Personal photos:</p>
                        {
                            personalPhotos.map(({ url, _id }) => {
                                return (
                                    <a href={`/photo/${_id}`} key={_id}><img style={{ width: "200px" }} src={url} alt="" /></a>
                                )
                            })
                        }
                        <Toast />
                    </div>
            }
        </>
    )
}

export default ProfilePage