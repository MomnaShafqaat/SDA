import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import ProfilePopup from './ProfilePopup';

function Layout() {
  const location = useLocation();
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);

  // Optional: hide navbar/footer on specific routes
  const hideNavbarFooter = location.pathname === '/create-mentor-profile';

  useEffect(() => {
    const checkProfile = async () => {
      if (!isLoading && isAuthenticated && user?.sub) {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/profile/${user.sub}`);
          const userData = response.data;
          // if (!userData.bio) {
          //   setShowProfilePopup(true);
          // }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setProfileChecked(true);
        }
      }
    };

    if (!profileChecked) {
      checkProfile();
    }
  }, [isAuthenticated, user?.sub, isLoading, profileChecked]);

  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarFooter && <Navbar />}
      
      <main className="flex-grow px-4 py-8">
        <Outlet />
        {showProfilePopup && (
          <ProfilePopup onClose={() => setShowProfilePopup(false)} />
        )}
      </main>

      <Chatbot />

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default Layout;
