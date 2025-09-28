// src/pages/Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [topProducts, setTopProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const topRes = await fetch("http://localhost:5000/api/top-products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const topData = await topRes.json();
        setTopProducts(Array.isArray(topData) ? topData : []);

        const recRes = await fetch("http://localhost:5000/api/recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const recData = await recRes.json();
        setRecommended(
          Array.isArray(recData) && recData.length
            ? recData
            : [
                { _id: 1, productId: { name: "Sample Apple", price: 10, category: "Fruits" } },
                { _id: 2, productId: { name: "Sample Bread", price: 15, category: "Bakery" } },
                { _id: 3, productId: { name: "Sample Milk", price: 20, category: "Dairy" } },
              ]
        );

        const ordersRes = await fetch("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersData = await ordersRes.json();
        setOrders(Array.isArray(ordersData) ? ordersData : []);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -260 : 260,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <div style={styles.loading}>Loading Dashboard...</div>;

  const isNewUser = orders.length === 0;

  return (
    <div style={styles.page}>
      <div style={styles.backgroundOverlay}></div>

      {/* Floating gradient shapes */}
      <div style={{ ...styles.shape, ...styles.shape1 }}></div>
      <div style={{ ...styles.shape, ...styles.shape2 }}></div>
      <div style={{ ...styles.shape, ...styles.shape3 }}></div>

      {/* Floating grocery illustrations */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
        alt="apple"
        style={{ ...styles.icon, top: "15%", left: "10%", animationDelay: "0s" }}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
        alt="bread"
        style={{ ...styles.icon, top: "60%", left: "5%", animationDelay: "2s" }}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png"
        alt="cart"
        style={{ ...styles.icon, bottom: "20%", right: "10%", animationDelay: "4s" }}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
        alt="milk"
        style={{ ...styles.icon, top: "30%", right: "15%", animationDelay: "1s" }}
      />

      <div style={styles.centerContainer}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Dashboard</h1>

          {isNewUser && (
            <section style={styles.section}>
              <h2 style={styles.subHeading}>Welcome! Try a Free Sample</h2>
              <div style={styles.grid}>
                <div style={{ ...styles.productCard, border: "2px dashed #667eea" }}>
                  <h3 style={styles.productName}>Free Sample Product</h3>
                  <p style={styles.productDetail}>Category: Demo</p>
                  <button
                    style={styles.button}
                    onClick={() => handleAddToCart({ name: "Free Sample Product", price: 0 })}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </section>
          )}

          <section style={styles.section}>
            <h2 style={styles.subHeading}>Top Products</h2>
            <div style={styles.grid}>
              {topProducts.map((p) => (
                <div key={p._id} style={styles.productCard}>
                  <h3 style={styles.productName}>{p.name}</h3>
                  <p style={styles.productDetail}>Price: ${p.price}</p>
                  <p style={styles.productDetail}>Category: {p.category}</p>
                  <button style={styles.button} onClick={() => handleAddToCart(p)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.subHeading}>Recommended for You</h2>
            <div style={styles.carouselContainer}>
              <button style={{ ...styles.arrow, ...styles.arrowLeft }} onClick={() => scrollCarousel("left")}>‹</button>
              <div style={styles.carousel} ref={carouselRef}>
                {recommended.map((r) => (
                  <div key={r._id} style={{ ...styles.productCard, ...styles.carouselCard }}>
                    <h3 style={styles.productName}>{r.productId?.name || "Product"}</h3>
                    <p style={styles.productDetail}>Price: ${r.productId?.price || "-"}</p>
                    <p style={styles.productDetail}>Category: {r.productId?.category || "-"}</p>
                    <button style={styles.button} onClick={() => handleAddToCart(r.productId)}>Add to Cart</button>
                  </div>
                ))}
              </div>
              <button style={{ ...styles.arrow, ...styles.arrowRight }} onClick={() => scrollCarousel("right")}>›</button>
            </div>
          </section>

          {!isNewUser && (
            <section style={styles.section}>
              <h2 style={styles.subHeading}>Your Previous Orders</h2>
              <div style={styles.grid}>
                {orders.map((o) => (
                  <div key={o._id} style={styles.productCard}>
                    <h3 style={styles.productName}>Order #{o._id}</h3>
                    <p style={styles.productDetail}>Items: {o.items.length}</p>
                    <p style={styles.productDetail}>Total: ${o.total}</p>
                    <button style={styles.buttonSecondary} onClick={() => navigate(`/order-tracking/${o._id}`)}>Track Order</button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0, left: 0, width: "100%", height: "100%",
    background: "linear-gradient(135deg, #f6d365 0%, #fda085 25%, #84fab0 75%, #8fd3f4 100%)",
    zIndex: 0,
    animation: "gradientMove 12s ease infinite",
    backgroundSize: "400% 400%",
  },
  shape: {
    position: "absolute",
    borderRadius: "50%",
    background: "radial-gradient(circle at center, rgba(255,255,255,0.25), transparent)",
    zIndex: 1,
  },
  shape1: { width: "180px", height: "180px", top: "10%", left: "8%" },
  shape2: { width: "220px", height: "220px", bottom: "12%", right: "10%" },
  shape3: { width: "150px", height: "150px", bottom: "25%", left: "20%" },

  icon: {
    position: "absolute",
    width: "70px",
    height: "70px",
    opacity: 0.8,
    filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))",
    animation: "float 6s ease-in-out infinite",
    zIndex: 1,
  },

  centerContainer: { width: "100%", maxWidth: "430px", zIndex: 2, padding: "15px" },
  card: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "20px",
    padding: "18px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
  },
  heading: { textAlign: "center", fontSize: "24px", fontWeight: "700", marginBottom: "20px", color: "#2d3748" },
  section: { marginBottom: "20px" },
  subHeading: { marginBottom: "10px", fontSize: "16px", fontWeight: "600", color: "#4a4a4a" },
  grid: { display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" },
  productCard: {
    flex: "1 1 150px",
    background: "#fff",
    padding: "10px",
    borderRadius: "15px",
    boxShadow: "0 6px 20px rgba(102,126,234,0.15)",
    textAlign: "center",
  },
  carouselContainer: { position: "relative", display: "flex", alignItems: "center" },
  carousel: { display: "flex", gap: "12px", overflowX: "auto", scrollBehavior: "smooth", paddingBottom: "6px", scrollbarWidth: "none" },
  carouselCard: { flex: "0 0 auto", minWidth: "150px" },
  arrow: { fontSize: "24px", background: "rgba(0,0,0,0.05)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", zIndex: 3 },
  arrowLeft: { position: "absolute", left: "-12px", top: "35%" },
  arrowRight: { position: "absolute", right: "-12px", top: "35%" },
  productName: { fontWeight: "700", marginBottom: "5px", color: "#2d3748", fontSize: "14px" },
  productDetail: { margin: "2px 0", color: "#4a5568", fontSize: "13px" },
  button: { marginTop: "6px", padding: "6px 10px", background: "linear-gradient(90deg,#667eea,#764ba2)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", width: "100%", fontSize: "13px" },
  buttonSecondary: { marginTop: "6px", padding: "5px 10px", background: "#667eea", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%", fontWeight: "600", fontSize: "12px" },
  loading: { textAlign: "center", fontSize: "14px", marginTop: "30px" },
};

// Animation for floating groceries + moving gradient
const styleSheet = document.styleSheets[0];
const keyframesFloat = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}`;
const keyframesGradient = `
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`;
styleSheet.insertRule(keyframesFloat, styleSheet.cssRules.length);
styleSheet.insertRule(keyframesGradient, styleSheet.cssRules.length);
