import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { IMG_URL } from '../../config';
import { API_URL } from '../../config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';




const CardAds = ({ title, describe, datePublish, photo, price, location, infoOfSeller, _id, user }) => {
  const navigate = useNavigate();

  
  const fd = new FormData();
  fd.append('title', title);
  fd.append('describe', describe);
  fd.append('datePublish', datePublish);
  fd.append('photo', photo);
  fd.append('price', price);
  fd.append('location', location);
  fd.append('infoOfSeller', infoOfSeller);
  fd.append('user', user._id); 
  const [status, setStatus] = useState(null);


  const options = {
    method: 'GET',
    credentials: 'include',
    body: fd,
  }

  setStatus('loading');

  fetch(`${API_URL}/api/ads`, options)
    .then(res => {
      if (res.status === 200) {
        setStatus('success');
        navigate("/");
      } else if (res.status === 400) {
        setStatus('clientError');
      } else if (res.status === 409) {
        setStatus('loginError');
      } else {
        setStatus('serverError');
      }
    })
    .catch(err => {
      setStatus('serverError');
    });

  return (

    
    <Card style={{ width: '18rem' }}>
      { status === "loading" && (<Spinner animation="border" role="status">
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
      )}
    <Card.Img variant="top" src={IMG_URL + photo} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <ListGroup variant="flush">
        <Card.Text>
          {describe}
        </Card.Text>
        <ListGroup.Item>{price}</ListGroup.Item>
        <ListGroup.Item>{location}</ListGroup.Item>
        <ListGroup.Item>{infoOfSeller}</ListGroup.Item>
      </ListGroup>
      <Link to={"/ad/" + _id}>
            <Button variant="success">Read more</Button>
          </Link> 
    </Card.Body>  
  </Card>
  )
}

export default CardAds;