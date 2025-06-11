import React from "react";
import { useNavigate } from "react-router-dom";

function CancelPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#fff3f3",
        textAlign: "center"
      }}
    >
      <h1 style={{ color: "#c62828", fontSize: "2rem" }}>Payment Failed</h1>
      <p style={{ color: "#b71c1c", fontSize: "1.2rem", marginTop: "10px" }}>
        ❌ Payment was cancelled.
      </p>
      <button
        onClick={() => navigate("/student-dashboard")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#c62828",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Back to Homepage
      </button>
    </div>
  );
}

export default CancelPage;
