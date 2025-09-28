import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "15px",
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      transition: "transform 0.2s",
      cursor: "pointer",
      margin: "10px"
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "contain" }} />
      <h4 style={{ margin: "10px 0", color: "#333" }}>{product.name}</h4>
      <p style={{ color: "#4CAF50", fontWeight: "bold" }}>₹{product.price}</p>
      <button style={{
        padding: "8px 12px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer"
      }}>Add to Cart</button>
    </div>
  );
}
