import React from "react";

export function Card({ children }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
