import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { IMG_URL } from '../../config';
import styles from '../features/CardAds.module.scss'
import { dateToStr } from '../../utils/dateToStr';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { API_URL } from '../../config';



const CardAds = ({ title, describe, photo, datePublish, price, location, infoOfSeller, _id }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/user`, {
          credentials: 'include', 
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkAuthStatus();
  }, [user]);

  const formattedDate = dateToStr(new Date(datePublish));
  return (
    <>
    <div className={styles.card}>
      {isAuthenticated ? (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={IMG_URL + photo} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <ListGroup variant="flush">
        <Card.Text>
          {describe}
        </Card.Text>
        <ListGroup.Item>{formattedDate}</ListGroup.Item>
        <ListGroup.Item>{price}</ListGroup.Item>
        <ListGroup.Item>{location}</ListGroup.Item>
        <ListGroup.Item>{infoOfSeller}</ListGroup.Item>
      </ListGroup>
      <Link to={"/ads/" + _id}>
            <Button variant="primary">Read more</Button>
          </Link> 
    </Card.Body>  
  </Card>
  ) : (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={IMG_URL + photo} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <ListGroup variant="flush">
        <Card.Text>
          {describe}
        </Card.Text>
        <ListGroup.Item>{formattedDate}</ListGroup.Item>
        <ListGroup.Item>{price}</ListGroup.Item>
        <ListGroup.Item>{location}</ListGroup.Item>
        <ListGroup.Item>{infoOfSeller}</ListGroup.Item>
      </ListGroup>
      </Card.Body>  
  </Card>
      )}
  </div>
  </>
  );
};

export default CardAds;