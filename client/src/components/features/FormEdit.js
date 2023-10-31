import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config";
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/Button";


const FormEdit = props => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(props.title || '');
  const [describe, setDescribe] = useState(props.describe || '');
  const [datePublish, setDatePublish] = useState(new Date());
  const [photo, setPhoto] = useState(props.photo || null);
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');
  const [infoOfSeller, setInfoOfSeller] = useState(props.infoOfSeller || '');
  const [status, setStatus] = useState('');


  const handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('title', title);
    fd.append('describe', describe);
    fd.append('datePublish', datePublish);
    fd.append('photo', photo);
    fd.append('price', price);
    fd.append('location', location);
    fd.append('infoOfSeller', infoOfSeller);

    const options = {
      method: 'PUT',
      credentials: 'include',
      body: fd,
    }

    setStatus('loading');

    fetch(`${API_URL}/api/ads/${id}`, options)
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
  }

  return (
    <Form className='col-12 col-sm-4 mx-auto' onSubmit={handleSubmit}>
      <h1 className='my-4'>Add Edit</h1>

      { status === "success" && (<Alert variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <p>You have been successfully registered! You can now log in...</p>
      </Alert>
      )}

      { status === "serverError" && (<Alert variant="danger">
        <Alert.Heading>Something went wrong...</Alert.Heading>
        <p>Unexpected error... Try again!</p>
      </Alert>
  )}

      { status === "clientError" && (<Alert variant="danger">
        <Alert.Heading>No enought data</Alert.Heading>
        <p>You have to fill all the fields</p>
      </Alert>
      )}

      { status === "loginError" && (<Alert variant="warning">
        <Alert.Heading>Login already in use</Alert.Heading>
        <p>You have to use other login!</p>
      </Alert>
      )}

      { status === "loading" && (<Spinner animation="border" role="status">
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescribe">
        <Form.Label>Describe</Form.Label>
        <Form.Control type="text" value={describe} onChange={e => setDescribe(e.target.value)} placeholder="Enter describe" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>DatePublish: </Form.Label>
        <DatePicker selected={datePublish} onChange={(date) => setDatePublish(date)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhoto">
        <Form.Label>Photo</Form.Label>
        <Form.Control type="file" onChange={e => setPhoto(e.target.files[0])} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter price" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter location" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formInfoSeller">
        <Form.Label>Info of seller</Form.Label>
        <Form.Control type="text" value={infoOfSeller} onChange={e => setInfoOfSeller(e.target.value)} placeholder="Enter info of seller" />
      </Form.Group>

      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
export default FormEdit;