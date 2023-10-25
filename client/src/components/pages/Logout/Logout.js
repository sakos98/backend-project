import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/userRedux";
import { API_URL } from "../../../config";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from "react-bootstrap";

const Logout = () => {
  const dispatch = useDispatch;
  const navigate = useNavigate();
  const [setIsAuthenticated] = useState(true); 

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.status === 200) {
        setIsAuthenticated(false);
        dispatch(logOut());
        navigate('/');
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
  );
}

export default Logout;