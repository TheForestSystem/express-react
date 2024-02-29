// src/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/user/ab55531d-f919-4560-9dd9-c3789c30e275') // Replace '123' with the user ID or parameter to fetch the user data
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="profile">
      {user && (
        <> 
          <link rel='stylesheet' href='/profile.css' />
          <img className="profile-img" src={`/api/user/avatar/${user.uuid}`} alt="Profile" />
          <div className="profile-info">
            <p><strong>First Name:</strong> {user.fname}</p>
            <p><strong>Last Name:</strong> {user.lname}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
