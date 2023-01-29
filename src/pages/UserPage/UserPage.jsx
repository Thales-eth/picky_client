import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import Loader from '../../components/Loader/Loader'
import PhotosService from '../../services/photos.service'
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
                        <img style={{ width: "50px", height: "50px", borderRadius: "50%", margin: "0 auto", display: "block" }} src={avatar} alt="" />
                        <h1>Username: {username}</h1>
                        <h1>Email: {email}</h1>
                        <a className='editBtn btn' href="/my-profile/edit">Edit Profile</a>
                        <a className='ml-5 btn' href={`/friends/${user_id}`}>Friends ({user?.friends.length})</a>
                        <a className='ml-5 btn btn-danger' href="/my-likes">Favorite Photos ({user?.favoritePhotos.length})</a>
                        <p>Personal photos:</p>
                        {
                            personalPhotos.map(({ url, _id }) => {
                                return (
                                    <a href={`/photo/${_id}`} key={_id}><img style={{ width: "200px" }} src={url} alt="" /></a>
                                )
                            })
                        }

                    </div>
            }
        </>
    )
}

export default UserPage