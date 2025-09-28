// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((acc, item) => {
    const priceNumber = Number(String(item.price).replace(/[^0-9.]/g, ""));
    return acc + (isNaN(priceNumber) ? 0 : priceNumber);
  }, 0);

  const handleCheckout = () => {
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
    navigate("/checkout");
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div style={styles.page}>
      <div style={styles.cartBox}>
        <h1 style={styles.heading}>Your Cart</h1>
        {cart.length === 0 ? (
          <p style={styles.emptyText}>Your cart is empty 😔</p>
        ) : (
          <>
            <div style={styles.cartList}>
              {cart.map((item, idx) => (
                <div key={idx} style={styles.cartItem}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={styles.itemImage}
                  />
                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.itemPrice}>{item.price}</p>
                  </div>
                  <button
                    style={styles.removeButton}
                    onClick={() => removeItem(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <h2 style={styles.total}>Total: ₹{total.toFixed(2)}</h2>
            <button style={styles.checkoutButton} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // vertical centering
    background: "linear-gradient(135deg, #f0c3fc, #8ec5fc)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },
  cartBox: {
    width: "100%",
    maxWidth: "500px", // box width fixed like login
    background: "rgba(255, 255, 255, 0.95)",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 15px 50px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "25px",
    textAlign: "center",
    flexShrink: 0,
  },
  heading: {
    color: "#4b0082",
    fontSize: "28px",
    fontWeight: "700",
  },
  emptyText: {
    fontSize: "18px",
    color: "#555",
    marginTop: "20px",
  },
  cartList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    padding: "12px 15px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  itemImage: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    borderRadius: "8px",
    background: "#f9f9f9",
    padding: "4px",
    marginRight: "15px",
  },
  itemDetails: {
    textAlign: "left",
    flexGrow: 1,
  },
  itemName: {
    fontSize: "15px",
    fontWeight: "600",
    margin: "0 0 4px 0",
    color: "#4b0082",
  },
  itemPrice: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  removeButton: {
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#ff4d4f",
    color: "#fff",
    transition: "all 0.3s",
  },
  total: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#4b0082",
    marginTop: "10px",
  },
  checkoutButton: {
    padding: "12px 25px",
    background: "linear-gradient(90deg,#6a11cb,#a4508b)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
};
