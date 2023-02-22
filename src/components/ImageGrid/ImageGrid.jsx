import './ImageGrid.css'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';

const StandardImageList = ({ items, cols }) => {
    return (
        <ImageList className='imageList mt-5' sx={{ width: "100%", height: "100%" }} cols={cols} rowHeight={164}>
            {items.map(({ url, _id }) => (
                <Link key={_id} to={`/photo/${_id}`}>
                    <ImageListItem >
                        <img
                            src={`${url}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="grid image"
                            loading="lazy"
                        />
                    </ImageListItem>
                </Link>
            ))}
        </ImageList>
    );
}

export default StandardImageList