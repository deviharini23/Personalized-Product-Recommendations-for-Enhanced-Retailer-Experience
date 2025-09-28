import React, { useState } from "react";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert("Please enter your feedback before submitting.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert("Thank you for your valuable feedback! We appreciate your input.");
    setFeedback("");
    setRating(0);
    setCategory("general");
    setIsSubmitting(false);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden"
    },
    backgroundDesign: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1
    },
    circle1: {
      position: "absolute",
      top: "10%",
      left: "10%",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.1)",
      filter: "blur(40px)"
    },
    circle2: {
      position: "absolute",
      bottom: "10%",
      right: "10%",
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.05)",
      filter: "blur(40px)"
    },
    container: {
      position: "relative",
      zIndex: 2,
      width: "100%",
      maxWidth: "600px",
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "50px",
      textAlign: "center",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
      border: "1px solid rgba(255, 255, 255, 0.3)"
    },
    header: {
      marginBottom: "40px"
    },
    title: {
      fontSize: "42px",
      fontWeight: "700",
      marginBottom: "12px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    },
    subtitle: {
      fontSize: "16px",
      color: "#718096",
      fontWeight: "400",
      lineHeight: "1.6"
    },
    formSection: {
      marginBottom: "30px",
      textAlign: "left"
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: "#4a5568",
      marginBottom: "12px"
    },
    categorySelect: {
      width: "100%",
      padding: "16px",
      borderRadius: "12px",
      border: "2px solid #e2e8f0",
      fontSize: "16px",
      background: "#fff",
      outline: "none",
      color: "#2d3748",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      cursor: "pointer"
    },
    ratingContainer: {
      display: "flex",
      gap: "8px",
      justifyContent: "center",
      marginBottom: "30px"
    },
    star: {
      fontSize: "32px",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      color: "#e2e8f0"
    },
    starFilled: {
      color: "#ffd700",
      transform: "scale(1.1)"
    },
    starHover: {
      transform: "scale(1.2)"
    },
    textarea: {
      width: "100%",
      height: "180px",
      padding: "20px",
      borderRadius: "16px",
      border: "2px solid #e2e8f0",
      fontSize: "16px",
      background: "#fff",
      outline: "none",
      color: "#2d3748",
      boxSizing: "border-box",
      resize: "vertical",
      transition: "all 0.3s ease",
      lineHeight: "1.5",
      fontFamily: "inherit"
    },
    textareaFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
      transform: "translateY(-2px)"
    },
    charCount: {
      textAlign: "right",
      fontSize: "12px",
      color: "#a0aec0",
      marginTop: "8px"
    },
    button: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff",
      border: "none",
      padding: "18px 50px",
      borderRadius: "16px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      margin: "30px auto 20px",
      minWidth: "200px"
    },
    buttonHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.5)"
    },
    buttonDisabled: {
      background: "#cbd5e0",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none"
    },
    loadingSpinner: {
      width: "20px",
      height: "20px",
      border: "2px solid transparent",
      borderTop: "2px solid #fff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    },
    footer: {
      fontSize: "14px",
      color: "#a0aec0",
      marginTop: "30px",
      paddingTop: "20px",
      borderTop: "1px solid #e2e8f0"
    }
  };

  const categories = [
    { value: "general", label: "General Feedback" },
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
    { value: "ui", label: "User Interface" },
    { value: "performance", label: "Performance" },
    { value: "other", label: "Other" }
  ];

  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div style={styles.page}>
      {/* Background Design */}
      <div style={styles.backgroundDesign}>
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>
      </div>

      {/* Main Container */}
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Share Your Feedback</h1>
          <p style={styles.subtitle}>
            Your thoughts help us improve and create a better experience for everyone
          </p>
        </div>

        {/* Category Selection */}
        <div style={styles.formSection}>
          <label style={styles.label}>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={styles.categorySelect}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Star Rating */}
        <div style={styles.formSection}>
          <label style={styles.label}>How would you rate your experience?</label>
          <div style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  ...styles.star,
                  ...(star <= (hoveredStar || rating) && styles.starFilled),
                  ...(star <= hoveredStar && styles.starHover)
                }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Feedback Textarea */}
        <div style={styles.formSection}>
          <label style={styles.label}>Your Feedback</label>
          <textarea
            placeholder="Tell us what you think... What did you like? What can we improve?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={styles.textarea}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
              e.target.style.transform = "translateY(0)";
            }}
            maxLength={1000}
          />
          <div style={styles.charCount}>
            {feedback.length}/1000 characters
          </div>
        </div>

        {/* Submit Button */}
        <button
          style={{
            ...styles.button,
            ...(!feedback.trim() && styles.buttonDisabled)
          }}
          onClick={handleSubmit}
          disabled={!feedback.trim() || isSubmitting}
          onMouseEnter={(e) => {
            if (feedback.trim() && !isSubmitting) {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.5)";
            }
          }}
          onMouseLeave={(e) => {
            if (feedback.trim() && !isSubmitting) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }
          }}
        >
          {isSubmitting ? (
            <>
              <div style={styles.loadingSpinner}></div>
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>

        <p style={styles.footer}>
          © 2025 Qwipo. All rights reserved.
        </p>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}