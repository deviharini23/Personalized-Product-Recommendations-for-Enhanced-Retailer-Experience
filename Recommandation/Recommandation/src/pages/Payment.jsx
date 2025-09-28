// src/pages/Payment.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [method, setMethod] = useState("Card");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("orderDetails"));
    if (order) setTotal(order.total || 0);
  }, []);

  const handlePayment = () => {
    const order = JSON.parse(localStorage.getItem("orderDetails"));
    if (!order) return alert("No order found!");

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = { ...order, status: "Pending", method };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCart");
    
    // Navigate to order tracking page
    navigate("/order-tracking/" + (orders.length - 1));
  };

  // Optional: Razorpay placeholder
  const handleRazorpayPayment = () => {
    alert(`Razorpay payment integration placeholder for ₹${total}`);
    handlePayment();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1580910051070-f1687e21de7d?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.85)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.95)",
          padding: "40px 30px",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
          zIndex: 2,
          animation: "fadeIn 1s ease",
        }}
      >
        <h1 style={{ color: "#4b0082", fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}>
          Payment
        </h1>

        <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "25px" }}>
          Total Amount: ₹{total}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "25px" }}>
          {["Card", "UPI", "COD"].map((m) => (
            <label
              key={m}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 15px",
                borderRadius: "12px",
                border: method === m ? "2px solid #6a11cb" : "1px solid #ccc",
                background: method === m ? "rgba(106,17,203,0.1)" : "#fff",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
            >
              <input
                type="radio"
                value={m}
                checked={method === m}
                onChange={() => setMethod(m)}
                style={{ cursor: "pointer" }}
              />
              <span>
                {m === "Card" && "💳 Credit/Debit Card"}
                {m === "UPI" && "📱 UPI"}
                {m === "COD" && "💵 Cash on Delivery"}
              </span>
            </label>
          ))}
        </div>

        <button
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            background: "linear-gradient(90deg,#6a11cb,#a4508b)",
            transition: "all 0.3s ease",
            marginBottom: "10px",
          }}
          onClick={handleRazorpayPayment} // placeholder
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "linear-gradient(90deg,#5a0dbf,#9030a0)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "linear-gradient(90deg,#6a11cb,#a4508b)")
          }
        >
          Pay & Place Order
        </button>

        <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
          Your order will be processed securely.
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
