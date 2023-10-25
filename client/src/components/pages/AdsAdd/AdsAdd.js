import FormAdsAdd from '../../features/FormAdsAdd';
import React, { useEffect, useState } from 'react';
import { API_URL } from "../../../config";

const AdsAdd = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const options = {
          method: 'GET',
          credentials: 'include',
        };

        const response = await fetch(`${API_URL}/auth/user`, options);
        console.log(response);
        console.log('Response status code:', response.status);
        if (response.ok) {
          const userData = await response.json();
          console.log(userData, 'USER Authorized');
          setUser(userData);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    fetchUserData();
  }, []); 

    return (
      <div>
        {user !== null && <FormAdsAdd user={user} />}
      </div>
    );
  };


 

export default AdsAdd;