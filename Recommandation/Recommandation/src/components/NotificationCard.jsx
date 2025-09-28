import React from "react";

export default function NotificationCard({ title, message, type }) {
  // type: 'offer' | 'reorder' | 'info'
  const bgColor = type === "offer" ? "#E8F5E9" : type === "reorder" ? "#FFF3E0" : "#E3F2FD";
  const borderColor = type === "offer" ? "#4CAF50" : type === "reorder" ? "#FF9800" : "#2196F3";

  return (
    <div style={{
      background: bgColor,
      borderLeft: `5px solid ${borderColor}`,
      borderRadius: "10px",
      padding: "15px",
      marginBottom: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <h4 style={{ margin: "0 0 5px 0", color: borderColor }}>{title}</h4>
      <p style={{ margin: 0, color: "#333" }}>{message}</p>
    </div>
  );
}
