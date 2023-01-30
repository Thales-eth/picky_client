import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './ImageGrid.css'

const StandardImageList = ({ items, cols }) => {
    return (
        <ImageList className='imageList mt-5' sx={{ width: 500, height: 500 }} cols={cols} rowHeight={164}>
            {items.map(({ url, _id }) => (
                <a key={_id} href={`/photo/${_id}`}>
                    <ImageListItem >
                        <img
                            src={`${url}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="grid image"
                            loading="lazy"
                        />
                    </ImageListItem>
                </a>
            ))}
        </ImageList>
    );
}

export default StandardImageList