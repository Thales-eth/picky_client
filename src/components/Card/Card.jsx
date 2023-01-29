import './Card.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const GridCard = ({ url }) => {
    return (
        <Card className='GridCard' style={{
            width: '18rem', height: "18rem", background: `url(${url})`,
            backgroundSize: "cover", backgroundRepeat: "no-repeat"
        }}>
        </Card >
    );
}

export default GridCard;