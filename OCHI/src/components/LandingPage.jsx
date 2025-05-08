///FOR LANDING PAGE OF STUDENT AND REGULAR USER


// import { Outlet } from 'react-router'
// import { useAuth0 } from '@auth0/auth0-react'
// import Navbar from './Navbar'
// import Landing from './Landing'
// import Marque from './marque'
// import About from './About'
// import Eyes from './Eyes'
// import Featured from './Featured'
// import Footer from './Footer'
// import Chatbot from './Chatbot'
// function LandingPage(){
    
//     return(
//         <>
//             <Navbar />
//             <Landing />
//             <Marque />
//             <About />
//             <Eyes />
//             <Featured />
//             <Chatbot/>
//             <Footer />
//         </>        
//     )
// }
// export default LandingPage




/////This is for Landing Page Of Mentor

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from './Navbar';
import Landing from './Landing';
import Marque from './marque';
import About from './About';
import Eyes from './Eyes';
import Featured from './Featured';
import Footer from './Footer';
import Chatbot from './Chatbot';
import ProfilePopup from './ProfilePopup';
import ChatInterface from './ChatInterface';

// Styled components
const PageContentContainer = styled.div`
  filter: ${props => props.$isBlurred ? 'blur(4px)' : 'none'};
  pointer-events: ${props => props.$isBlurred ? 'none' : 'auto'};
  transition: filter 0.3s ease;
  overflow: ${props => props.$isBlurred ? 'hidden' : 'visible'};
`;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  z-index: 1000;
  font-size: 1.2rem;
  color: #333;
  font-family: 'Inter', sans-serif;
`;

function LandingPage() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);
 

  const checkProfile = useCallback(async () => {
    if (!isLoading && isAuthenticated && user?.sub) {
      try {
        const dismissed = JSON.parse(localStorage.getItem('profileReminderDismissed'));
        if (dismissed && new Date().getTime() < dismissed.expiry) return;

        const response = await axios.get(`http://localhost:5000/api/user/profile/${user.sub}`);
        //Add on which fields you want to show the popup
        // if (!response.data.bio) {
        //   setShowProfilePopup(true);
        // }
        setShowProfilePopup(false);

      } catch (error) {
        console.error('Profile check error:', error);
      } finally {
        setProfileChecked(true);
      }
    }
  }, [isAuthenticated, user?.sub, isLoading]);

  useEffect(() => {
    if (!profileChecked) checkProfile();
    
    // Set up interval to check every 5 seconds
    const interval = setInterval(() => {
      const dismissed = JSON.parse(localStorage.getItem('profileReminderDismissed'));
      if (dismissed && new Date().getTime() >= dismissed.expiry) {
        checkProfile();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [checkProfile, profileChecked]);

  if (isLoading) {
    return <LoadingScreen>Authenticating...</LoadingScreen>;
  }

  return (
    <>
      <Navbar />
      
      {isAuthenticated && showProfilePopup && (
        <ProfilePopup 
          onClose={() => {
            setShowProfilePopup(false);
            const item = {
              value: 'true',
              expiry: new Date().getTime() + 9000000, // 10 seconds
            };
            localStorage.setItem('profileReminderDismissed', JSON.stringify(item));
          }}
        />
      )}

      <PageContentContainer $isBlurred={isAuthenticated && showProfilePopup}>
        <Landing />
        <Marque />
        <About />
        <Eyes />
        <Featured  />
      </PageContentContainer>
      
      <Chatbot />
      <Footer />
    </>
  );
}

export default LandingPage;