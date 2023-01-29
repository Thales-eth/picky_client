import './ExplorerPage.css'
import photosService from '../../services/photos.service'
import GridCard from '../../components/Card/Card'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

const ExplorerPage = () => {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        photosService
            .getAllPhotos()
            .then(photos => setPhotos(photos))
            .catch(e => console.log(e))
    }, [])

    return (
        <Container className='ExplorerPage'>
            {
                photos.map(({ url, _id }) => {
                    return (
                        <a key={_id} href={`/photo/${_id}`}> <GridCard url={url} /></a>
                    )
                })
            }
        </Container >
    )
}

export default ExplorerPage