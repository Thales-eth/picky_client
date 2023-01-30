import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import Loader from '../../components/Loader/Loader'
import PhotosService from '../../services/photos.service'
import Toast from '../../components/Toast/Toast'
import AvatarImage from '../../components/Avatar/Avatar'
import StandardImageList from '../../components/ImageGrid/ImageGrid'
import './UserPage.css'

const UserPage = () => {

    const { user, isLoading } = useContext(AuthContext)
    const [loggedUser, setLoggedUser] = useState({ _id: "", avatar: "", username: "", email: "" })

    const [personalPhotos, setPersonalPhotos] = useState([])

    const { _id: user_id, avatar, username, email } = loggedUser

    useEffect(() => {
        console.log(user)

        user && setLoggedUser(user)

        user && PhotosService
            .getPersonalPhotos(user?._id)
            .then(photos => setPersonalPhotos(photos))
            .catch(e => console.log(e))
    }, [user])

    return (
        <>
            {
                isLoading ? <Loader />
                    :
                    <div className='ProfilePage'>
                        <div className="basicInfo mt-5">
                            <AvatarImage src={avatar} />
                            <h2>Username: {username}</h2>
                            <h2 >📧: {email}</h2>
                        </div>

                        <div className="UserButtons mt-3">
                            <a className='editBtn btn btn-light' href="/my-profile/edit">Edit Profile</a>
                            <a className='ms-1 btn btn-light' href={`/friends/${user_id}`}>Friends ({user?.friends.length})</a>
                            <a className='ms-1 btn btn-danger' href="/my-likes">Favorite Photos ({user?.favoritePhotos.length})</a>
                        </div>

                        <hr />

                        <p>My photos:</p>
                        <StandardImageList items={personalPhotos} cols={3} />
                        <Toast />
                    </div>
            }
        </>
    )
}

export default UserPage