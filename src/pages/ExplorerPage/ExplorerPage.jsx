import './ExplorerPage.css'
import photosService from '../../services/photos.service'
import StandardImageList from '../../components/ImageGrid/ImageGrid'
import { useEffect, useState } from 'react'

const ExplorerPage = () => {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        photosService
            .getAllPhotos()
            .then(photos => setPhotos(photos))
            .catch(e => console.log(e))
    }, [])

    return (
        <StandardImageList items={photos} cols={3} />
    )
}

export default ExplorerPage