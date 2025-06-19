import React from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f9f4", // soft green background
        textAlign: "center"
      }}
    >
      <h1 style={{ color: "#2e7d32", fontSize: "2rem" }}>✅ Payment Successful</h1>
      <p style={{ color: "#1b5e20", fontSize: "1.2rem", marginTop: "10px" }}>
        Thank you! Your payment has been processed successfully.
      </p>
      <button
        onClick={() => navigate("/student-dashboard")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Go to Student Dashboard
      </button>
    </div>
  );
}

export default SuccessPage;
