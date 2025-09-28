import React from "react";

export default function TrendingProductCard({ product }) {
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
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
      <h4 style={{ margin: "10px 0", color: "#333" }}>{product.name}</h4>
      <p style={{ color: "#4CAF50", fontWeight: "bold" }}>₹{product.price}</p>
      {product.combo && <p style={{ background: "#FFEB3B", borderRadius: "6px", padding: "2px 6px", display: "inline-block", fontSize: "12px" }}>Festive Combo</p>}
      <button style={{
        marginTop: "10px", padding: "8px 12px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer"
      }}>Add to Cart</button>
    </div>
  );
}
