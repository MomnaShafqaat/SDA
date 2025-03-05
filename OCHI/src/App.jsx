import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Contact from './components/Contact'
import LandingPage from './components/LandingPage'
import About from './components/About'
import PrivacyPolicy from './components/PrivacyPolicy'
import ProtectedRoutes from './ProtectedRoutes'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* LandingPage as the homepage */}
        <Route index element={<LandingPage />} />
        {/* All routes that need Layout wrapper */}
        <Route element={<Layout />}>
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About/>}/>
          <Route 
            path="privacy" 
            element={
              <ProtectedRoutes>
                <PrivacyPolicy/>
              </ProtectedRoutes>
            }
          />
          
        </Route>


        
      </Route>
    )
  )

  return (
    <div className="text-zinc-900 bg-gray-100 v-full min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App