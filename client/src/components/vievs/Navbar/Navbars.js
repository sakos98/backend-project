import styles from '../Navbar/navbar.module.scss'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/esm/NavLink';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../config';
import Logout from '../../pages/Logout/Logout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Navbars() {
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

  return (
    <Navbar bg="primary" variant="dark" className='justify-content-between mt-4 mb-4 rounded'>
      <Nav.Link href="/" as={NavLink} className={styles.home}>Ads.app</Nav.Link>
      <Nav className="mr-auto">
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="light">Submit</Button>
          </Col>
        </Row>
      </Nav>
      <Nav>
        {isAuthenticated ? (
          <>
            <Nav.Link href="/profile" as={NavLink}>My ads</Nav.Link>
            <Nav.Link href="/ads/add" as={NavLink}>Add ads</Nav.Link>
            <Nav.Link href="/logout" as={NavLink}><Logout /></Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link href="/login" as={NavLink}>Login</Nav.Link>
            <Nav.Link href="/register" as={NavLink}>Register</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default Navbars;