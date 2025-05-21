<<<<<<< HEAD
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
import AdminPage from './pages/AdminPage'
import AdminLogin from "./pages/AdminLogin";

function App() {
  const router = createBrowserRouter(

    createRoutesFromElements(
    <>
      {/* Routes that shouldn't use Layout */}
      <Route path="/callback" element={<Callback />} />
      <Route path="/admin" element={<AdminPage />} />
       <Route index element={<LandingPage />} />

        <Route element={<Layout />}>
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About/>}/>
          <Route path="/mentor-requests" element={<MentorRequests />} />
          <Route path="/success" element={<div>Success</div>} />
          <Route path="/cancel" element={<div>Cancel</div>} />
          <Route path="mentor-profile" element={<MentorProfile />} />
        <Route path="/build-mentor-profile" element={<BuildMentorProfile />} />
        <Route path="/loginAdmin" element={<AdminLogin />} />

          {/*Proteced route*/}
          <Route path="privacy" element={ <ProtectedRoutes> <PrivacyPolicy/> </ProtectedRoutes>}/>
          
          
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
