import './LikesPage.css'
import photosService from '../../services/photos.service'
import GridCard from '../../components/Card/Card'
import Loader from '../../components/Loader/Loader'
import { useEffect, useState, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { AuthContext } from '../../context/auth.context'

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
                    < div className='LikesPage' >
                        <Container className='ExplorerPage'>
                            {
                                likedPhotos.map(({ url, _id }) => {
                                    return (
                                        <a key={_id} href={`/photo/${_id}`}> <GridCard url={url} /></a>
                                    )
                                })
                            }
                        </Container >
                    </div >
            }
        </>
    )
}

export default LikesPage