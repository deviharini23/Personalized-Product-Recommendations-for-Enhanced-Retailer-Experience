// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>Qwipo</Link>
      </div>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
          <li><Link to="/productdetail" style={styles.link}>Products</Link></li>
          <li><Link to="/cart" style={styles.link}>Cart</Link></li>
          <li><Link to="/support" style={styles.link}>Support</Link></li>
          <li><Link to="/feedback" style={styles.link}>Feedback</Link></li>
        </ul>
      </nav>
      <div style={styles.rightSection}>
        {user && <span style={styles.user}>Hi, {user.name}</span>}
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#6a11cb",
    color: "#fff",
    flexWrap: "wrap",
  },
  logo: { fontSize: "24px", fontWeight: 600 },
  navList: { listStyle: "none", display: "flex", gap: "20px", margin: 0, padding: 0 },
  link: { color: "#fff", textDecoration: "none", fontWeight: 500 },
  user: { marginRight: "15px", fontWeight: 500 },
  logoutButton: {
    background: "#a4508b",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};
