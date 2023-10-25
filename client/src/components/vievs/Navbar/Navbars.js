import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/esm/NavLink';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../config';
import Logout from '../../pages/Logout/Logout';

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
      <Navbar.Brand className="ml-auto">Ads.app</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/" as={NavLink}>Home</Nav.Link>
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