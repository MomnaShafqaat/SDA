import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-[#004D43] text-white py-10 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Branding */}
        <div>
          <div className=" logo">
            <img src="/LOGO/mentorawhite.png" alt="Mentora Logo" className="w-40 h-auto mt-2 object-contain" />
          </div>
          <p className="text-gray-300 mt-2">Empowering students with expert mentorship.</p>
          <NavLink
            to="/loginAdmin"
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }>Admin</NavLink>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-300 space-y-2">
            <NavLink to="/"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }>
              Home
            </NavLink>
            <NavLink
              to="mentors"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Our Mentors
            </NavLink>
            <NavLink to="/chatInterface" className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }>Chat With Mentor</NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Contact Us
            </NavLink>

          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="text-gray-300 space-y-2">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/howitworks"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              How It Works
            </NavLink>
            <NavLink
              to="/testimonials"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Testimonials
            </NavLink>
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Privacy Policy
            </NavLink>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <NavLink
            to="/submit-testimonial"
            className={({ isActive }) =>
              `text-lg font-semibold mb-3 block py-2 pr-4 duration-200 ${isActive ? "text-orange-700" : "text-white-700"
              } hover:text-orange-700`
            }
          >
            Give Feedback
          </NavLink>

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
