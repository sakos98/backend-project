import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAdById, removeAd } from '../../../redux/adsRedux';
import styles from '../SingleAds/SingleAds.module.scss';
import { API_URL, IMG_URL } from '../../../config';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const SinglePost = props => {

  const { id } = useParams();
  const adsData = useSelector(state => getAdById(state, id));
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const deleteAd = e => {
    e.preventDefault();
    dispatch(removeAd(id));

    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    fetch(`${API_URL}/api/ads/${adsData._id}`, options)
      .then(res => {
        handleClose();
        navigate('/');
      });
  };


  if (!adsData) return <Navigate to="/" />;
  return <div className={styles.Post}>
    <div className={styles.singleAdPosition}>
      <div className={styles.singleAd}>
        <div className='d-flex justify-content-between'>
          <h2>{adsData.title}</h2>
          <div>
            <Link key={props.id} to={'/ads/edit/' + id}>
              <Button variant='outline-info m-1'>Edit</Button>
            </Link>
            <Button onClick={handleShow} variant='btn btn-outline-danger'>Delete</Button>
          </div>
        </div>
        <Card style={{ width: '60%' }}>
          <Card.Img variant="top" src={IMG_URL + adsData.photo} />
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Describe: </strong>{adsData.describe}</ListGroup.Item>
              <ListGroup.Item><strong>Date: </strong>{adsData.datePublish}</ListGroup.Item>
              <ListGroup.Item><strong>Price: </strong>{adsData.price}</ListGroup.Item>
              <ListGroup.Item><strong>Location: </strong>{adsData.location}</ListGroup.Item>
              <ListGroup.Item><strong>Seller Info: </strong>{adsData.infoOfSeller}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure to delete this post?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="danger" onClick={deleteAd}>Remove</Button>
      </Modal.Footer>
    </Modal>
  </div>


}

export default SinglePost;