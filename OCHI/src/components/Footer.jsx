import { FaInstagram, FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#004D43] text-white py-10 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Branding */}
        <div>
        <div  className=" logo"> 
    <img src="/LOGO/mentorawhite.png" alt="Mentora Logo"  className="w-40 h-auto mt-2 object-contain" />
    </div>
          <p className="text-gray-300 mt-2">Empowering students with expert mentorship.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-300 space-y-2">
            <li><a href="#" className="hover:text-gray-200">Home</a></li>
            <li><a href="#" className="hover:text-gray-200">Our Mentors</a></li>
            <li><a href="#" className="hover:text-gray-200">Chat with Mentor</a></li>
            <li><a href="#" className="hover:text-gray-200">Contact</a></li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="text-gray-300 space-y-2">
            <li><a href="#" className="hover:text-gray-200">About Us</a></li>
            <li><a href="#" className="hover:text-gray-200">How It Works</a></li>
            <li><a href="#" className="hover:text-gray-200">Testimonials</a></li>
            <li><a href="#" className="hover:text-gray-200">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
    
          <h3 className="text-lg font-semibold mb-3">give feedback</h3>
         
      
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.instagram.com" target="_blank" className="text-gray-300 hover:text-gray-200 text-2xl">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com" target="_blank" className="text-gray-300 hover:text-gray-200 text-2xl">
              <FaFacebookF />
            </a>
          </div>
        </div>


        

      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-gray-300 text-sm">
        © 2024 Mentora. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
