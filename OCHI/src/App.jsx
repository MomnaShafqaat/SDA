
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
import ViewMentorProfile from './components/ViewMentorProfile';
import ViewStudentProfile from './components/ViewStudentProfile';
import EditStudentProfile from './components/EditStudentProfile';
import CVAnalyzer from './components/CVAnalyzer';

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
        <Route path="success" element={<SuccessPage/>} />
        <Route path="cancel" element={<CancelPage/>} />


        {/* All Layout-wrapped routes */}
        <Route element={<Layout />}>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="mentors" element={<ProtectedRoutes><MentorsPage /></ProtectedRoutes>} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="howitworks" element={<HowItWorks/>} />
        <Route path="/submit-testimonial" element={<ProtectedRoutes><SubmitTestimonial /></ProtectedRoutes>} />
        <Route path="mentor-profile" element={<ProtectedRoutes><MentorProfile /></ProtectedRoutes>} />
        <Route path="student-profile" element={<ProtectedRoutes><StudentProfile /></ProtectedRoutes>} />
        <Route path="/mentor-requests" element={<ProtectedRoutes><MentorRequests /></ProtectedRoutes>} />
        <Route path="/mentor-dashboard" element={<ProtectedRoutes><MentorDashboard/></ProtectedRoutes>} />  
        <Route path="/student-dashboard" element={<ProtectedRoutes><StudentMentors/></ProtectedRoutes>} />
        <Route path="/edit-mentor-profile" element={<ProtectedRoutes><EditMentorProfile /></ProtectedRoutes>} />
        <Route path="chatInterface" element={<ProtectedRoutes><ChatInterface /></ProtectedRoutes>} />
        <Route path="privacy" element={<ProtectedRoutes><PrivacyPolicy /></ProtectedRoutes>} />
        <Route path="/loginAdmin" element={<AdminLogin />} />
        
        <Route path="/mentor-profile/:mentorId" element={<ProtectedRoutes><ViewMentorProfile /></ProtectedRoutes>} />
        <Route path="/student-profile/:studentId" element={<ProtectedRoutes><ViewStudentProfile /></ProtectedRoutes>} />
        <Route path="/edit-student-profile" element={<ProtectedRoutes><EditStudentProfile /></ProtectedRoutes>} />
      {  /* <Route path="/admin/mentor-profile/:mentorId" element={<ViewMentorProfile />} />*/}
        < Route path="/admin/mentor-profile/:mentorId" element={<MentorProfile />} />


        <Route path="cv-analyzer" element={<ProtectedRoutes><CVAnalyzer/></ProtectedRoutes>}/>
        
      </Route>
        {/* <Route element={<Layout />}>
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
        
      </Route> */}
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
