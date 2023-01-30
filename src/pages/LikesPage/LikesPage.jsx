import './LikesPage.css'
import photosService from '../../services/photos.service'
import Loader from '../../components/Loader/Loader'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import StandardImageList from '../../components/ImageGrid/ImageGrid'

const LikesPage = () => {

    const [likedPhotos, setLikedPhotos] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(() => {
        user &&
            photosService
                .getLikedPhotos(user?._id)
                .then(photos => {
                    setLikedPhotos(photos)
                })
                .catch(e => console.log(e))
    }, [user])

    return (
        <>
            {
                !user
                    ?
                    <Loader />
                    :
                    <StandardImageList items={likedPhotos} cols={3} />
            }
        </>
    )
}

export default LikesPage