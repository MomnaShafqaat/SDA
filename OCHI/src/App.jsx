
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
import MentorRequests from './components/MentorRequests';
import AdminLogin from './pages/AdminLogin';
import StudentProfile from './components/StudentProfile';
import MentorsPage from './components/MentorsPage';

import EditMentorProfile from './components/EditMentorProfile';
import MentorDashboard from './components/MentorDashbard';
import StudentMentors from './components/StudentMentors';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import SubmitTestimonial from './components/SubmitTestimonials';

function SuccessPage() {
  console.log("✅ Payment was successful.");
  
  return (
    <div className="mt-6 ms-6">
      <h1 className="">Payment Successfull</h1>
    </div>
  );
}


function CancelPage() {
  console.log("❌ Payment was cancelled.");
  return <h1>Payment Cancelled</h1>;
}

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
        <Route path="mentors" element={<MentorsPage />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="howitworks" element={<HowItWorks/>} />
        <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
        <Route path="mentor-profile" element={<MentorProfile />} />
        <Route path="student-profile" element={<StudentProfile />} />
        <Route path="/mentor-requests" element={<MentorRequests />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard/>} />  
        <Route path="/student-dashboard" element={<StudentMentors/>} />
        <Route path="/edit-mentor-profile" element={<EditMentorProfile />} />
        <Route path="chatInterface" element={<ProtectedRoutes><ChatInterface /></ProtectedRoutes>} />
        <Route path="privacy" element={<ProtectedRoutes><PrivacyPolicy /></ProtectedRoutes>} />
    <Route path="/loginAdmin" element={<AdminLogin />} />
    <Route path="success" element={<SuccessPage/>} />
          <Route path="cancel" element={<CancelPage/>} />

        
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
