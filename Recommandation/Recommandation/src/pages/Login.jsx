import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div style={styles.page}>
      {/* Animated CSS */}
      <style>
        {`
          @keyframes float1 {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(180deg); }
            100% { transform: translateY(0px) rotate(360deg); }
          }
          @keyframes float2 {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(20px) rotate(180deg); }
            100% { transform: translateY(0px) rotate(360deg); }
          }
          .floating-shape {
            position: absolute;
            border-radius: 50%;
            opacity: 0.15;
            z-index: 0;
          }
          .inputFocus:focus {
            border-color: #667eea;
            box-shadow: 0 0 12px rgba(102,126,234,0.5);
            transform: scale(1.02);
          }
          .buttonHover:hover {
            box-shadow: 0 8px 30px rgba(102,126,234,0.5);
            transform: scale(1.03);
          }
        `}
      </style>

      {/* Floating gradient circles */}
      <div style={styles.backgroundDesign}>
        <div className="floating-shape" style={{ width: "250px", height: "250px", background: "linear-gradient(135deg,#667eea,#764ba2)", top: "10%", left: "10%", animation: "float1 6s ease-in-out infinite" }}></div>
        <div className="floating-shape" style={{ width: "180px", height: "180px", background: "linear-gradient(135deg,#764ba2,#667eea)", top: "40%", right: "15%", animation: "float2 7s ease-in-out infinite" }}></div>
        <div className="floating-shape" style={{ width: "120px", height: "120px", background: "linear-gradient(135deg,#667eea,#764ba2)", bottom: "20%", left: "25%", animation: "float1 8s ease-in-out infinite" }}></div>
      </div>

      {/* Centered Login Card */}
      <div style={styles.centerContainer}>
        <div style={styles.loginCard}>
          <h2 style={styles.cardTitle}>Welcome Back</h2>
          <p style={styles.cardSubtitle}>Sign in to your account</p>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                className="inputFocus"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
                className="inputFocus"
              />
            </div>

            <button type="submit" style={styles.loginButton} className="buttonHover">Sign In</button>
          </form>

          <p style={styles.toggle}>
            Don't have an account?{" "}
            <span style={styles.toggleSpan} onClick={() => navigate("/register")}>Create account</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", width: "100vw", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  backgroundDesign: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 },
  centerContainer: { position: "relative", zIndex: 2, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", width: "100%" },
  loginCard: { background: "rgba(255,255,255,0.95)", backdropFilter: "blur(25px)", borderRadius: "20px", padding: "35px 30px", boxShadow: "0 20px 50px rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.3)", width: "100%", maxWidth: "320px", textAlign: "center", position: "relative", transition: "all 0.3s ease" },
  cardTitle: { fontSize: "28px", fontWeight: "700", color: "#2d3748", marginBottom: "6px" },
  cardSubtitle: { fontSize: "14px", color: "#718096", marginBottom: "20px" },
  form: { width: "100%" },
  inputGroup: { marginBottom: "16px", textAlign: "left" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#4a5568", marginBottom: "6px" },
  input: { width: "100%", padding: "12px", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "14px", boxSizing: "border-box", background: "#fff", outline: "none", transition: "all 0.3s ease" },
  loginButton: { background: "linear-gradient(135deg, #667eea, #764ba2)", color: "#fff", border: "none", padding: "12px", width: "100%", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "600", marginTop: "10px", transition: "all 0.3s ease" },
  toggle: { textAlign: "center", fontSize: "13px", color: "#718096", marginTop: "15px" },
  toggleSpan: { color: "#667eea", cursor: "pointer", fontWeight: "600" },
};
