// ProtectedRoutes.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isLoading, isAuthenticated]);

  const handleLogin = async () => {
    try {
      await loginWithPopup();
      setShowLoginModal(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleClose = () => {
    setShowLoginModal(false);
    navigate("/"); // Redirect to homepage or any public route
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isAuthenticated) return children;

  return (
    <div className="animate-fadeIn">
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center relative">
            {/* Close (X) button at top-right corner */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              ✖️
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
            <p className="text-gray-600 mb-6">Please log in to continue.</p>

            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-6 py-3 rounded-full hover:scale-105 transform transition duration-300 ease-in-out"
            >
              Log In
            </button>

            <p className="mt-4 text-sm text-gray-500">
              Or{" "}
              <button
                onClick={handleClose}
                className="text-blue-500 hover:underline"
              >
                go back to homepage
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoutes;
