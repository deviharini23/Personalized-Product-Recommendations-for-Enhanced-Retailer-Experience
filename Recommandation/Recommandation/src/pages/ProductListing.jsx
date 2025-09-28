import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const product = { id, name: "Sweets Combo", price: 499, description: "Festive sweets combo pack", image: "/assets/sweets.jpg" };

  return (
    <div style={{ display: "flex", padding: "40px", justifyContent: "center" }}>
      <img src={product.image} alt={product.name} style={{ width: "300px", height: "300px", objectFit: "contain", marginRight: "40px" }} />
      <div>
        <h2>{product.name}</h2>
        <p style={{ color: "#8daef0ff", fontWeight: "bold" }}>₹{product.price}</p>
        <p>{product.description}</p>
        <button style={{
          padding: "10px 15px", background: "#6d76eeff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer"
        }}>Add to Cart</button>
        <div style={{ marginTop: "20px" }}>
          <h4>Frequently Bought Together</h4>
          <p>Sweets Combo + Decorative Items</p>
        </div>
      </div>
    </div>
  );
}