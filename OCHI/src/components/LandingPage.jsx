import React from 'react'

import { Outlet } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from './Navbar'
import Landing from './Landing'
import Marque from './marque'
import About from './About'
import Eyes from './Eyes'
import Featured from './Featured'
import Footer from './Footer'
import Chatbot from './Chatbot'
function LandingPage(){
    
    return(
        <>
            <Navbar />
            <Landing />
            <Marque />
            <About />
            <Eyes />
            <Featured />
            <Chatbot/>
            <Footer />
        </>        
    )
}
export default LandingPage