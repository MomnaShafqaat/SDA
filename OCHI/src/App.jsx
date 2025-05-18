import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Contact from './components/Contact';
import LandingPage from './components/LandingPage';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProtectedRoutes from './ProtectedRoutes';
import Callback from './Callback';
import AdminPage from './pages/AdminPage';
import ChatInterface from './components/ChatInterface';
import MentorProfile from './components/MentorProfile';
import BuildMentorProfile from './components/BuildMentorProfile';
import MentorRequests from './components/MentorRequests';

function App() {
  const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes that shouldn't use Layout */}
      <Route path="/callback" element={<Callback />} />
      <Route path="/admin" element={<AdminPage />} />
       <Route index element={<LandingPage />} />

      {/* All Layout-wrapped routes */}
      <Route element={<Layout />}>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="mentor-profile" element={<MentorProfile />} />
        <Route path="/build-mentor-profile" element={<BuildMentorProfile />} />
        <Route path="chatInterface" element={<ProtectedRoutes><ChatInterface /></ProtectedRoutes>} />
        <Route path="privacy" element={<ProtectedRoutes><PrivacyPolicy /></ProtectedRoutes>} />
        {/* All routes that need Layout wrapper */}
        <Route element={<Layout />}>
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About/>}/>
          <Route path="/mentor-requests" element={<MentorRequests />} />
          <Route path="/success" element={<div>Success</div>} />
          <Route path="/cancel" element={<div>Cancel</div>} />

          {/*Proteced route*/}
          <Route path="privacy" element={ <ProtectedRoutes> <PrivacyPolicy/> </ProtectedRoutes>}/>
          <Route path="/chatInterface" element={ <ProtectedRoutes> <ChatInterface/> </ProtectedRoutes>}/>
          
        </Route>
    

        
      </Route>
    </>
  )
);


   return (
    <div className="text-zinc-900 bg-gray-100 v-full min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
