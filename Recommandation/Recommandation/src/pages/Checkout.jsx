// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkoutCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    setCart(checkoutCart);
  }, []);

  // Calculate total
  const total = cart.reduce((acc, item) => {
    const priceNumber = Number(String(item.price).replace(/[^0-9.]/g, ""));
    return acc + (isNaN(priceNumber) ? 0 : priceNumber);
  }, 0);

  const discountedTotal = discountApplied ? (total * 0.6).toFixed(2) : total.toFixed(2);

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "NEWUSER40") {
      setDiscountApplied(true);
      alert("Coupon Applied! You got 40% off 🎉");
    } else {
      alert("Invalid Coupon Code ❌");
    }
  };

  const handleProceedPayment = () => {
    if (!address || !pincode || !state || !phone) {
      alert("Please fill all the details");
      return;
    }
    localStorage.setItem(
      "orderDetails",
      JSON.stringify({ items: cart, total: discountedTotal, address, pincode, state, phone })
    );
    navigate("/payment");
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
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
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
          maxWidth: "500px",
          background: "rgba(255,255,255,0.95)",
          padding: "40px 30px",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
          animation: "fadeIn 1s ease",
        }}
      >
        <h1 style={{ color: "#4b0082", fontSize: "28px", fontWeight: "700", marginBottom: "15px" }}>
          Checkout
        </h1>
        <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
          Total Amount: ₹{total.toFixed(2)}
        </p>

        {/* Coupon Code */}
        <div style={{ display: "flex", width: "100%", marginBottom: "20px", gap: "10px" }}>
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <button
            onClick={applyCoupon}
            style={{
              padding: "10px 15px",
              background: "linear-gradient(90deg,#6a11cb,#a4508b)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "linear-gradient(90deg,#5a0dbf,#9030a0)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "linear-gradient(90deg,#6a11cb,#a4508b)")
            }
          >
            Apply
          </button>
        </div>

        {discountApplied && (
          <p style={{ color: "#008000", fontWeight: "600", marginBottom: "15px" }}>
            Discount Applied! New Total: ₹{discountedTotal}
          </p>
        )}

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={handleProceedPayment}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "linear-gradient(90deg,#5a0dbf,#9030a0)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "linear-gradient(90deg,#6a11cb,#a4508b)")
          }
        >
          Proceed to Payment
        </button>
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

const styles = {
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
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
