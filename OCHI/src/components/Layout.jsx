// import React from 'react'

// import { Outlet } from 'react-router'
// import { useAuth0 } from '@auth0/auth0-react'
// import Navbar from './Navbar'


// import Footer from './Footer'
// import Chatbot from './Chatbot'
// import ProfilePopup from './ProfilePopup'
//  function Layout(){
   
//     return(
//         <>
//         <ProfilePopup/>
//             <Navbar /> 
//             <Outlet/>
//             <Chatbot/>
//             <Footer />
            
//         </>        
//     )
// }
// export default Layout

// Layout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import ProfilePopup from './ProfilePopup';

function Layout() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      // Only check if authentication is done and user exists
      if (!isLoading && isAuthenticated && user?.sub) {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/profile/${user.sub}`);
          if (!response.data.bio) {
            setShowProfilePopup(false);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setProfileChecked(true);
        }
      }
    };

    // Only check profile if we haven't checked yet
    if (!profileChecked) {
      checkProfile();
    }
  }, [isAuthenticated, user?.sub, isLoading, profileChecked]);

  // Handle loading state
  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      {showProfilePopup && (
        <ProfilePopup 
          onClose={() => {
            setShowProfilePopup(false);
            // Optional: Store dismissal in localStorage
            //localStorage.setItem('profileReminderDismissed', 'true');
          }}
        />
      )}
      <Chatbot />
      <Footer />
    </>
  );
}

export default Layout;