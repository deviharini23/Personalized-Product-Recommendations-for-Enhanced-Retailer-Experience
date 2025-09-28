import { useState, useEffect, useRef } from "react";

export default function Support() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    const msg = input.toLowerCase();
    let response =
      "I'm sorry, I didn't understand that. Please contact customer care.";

    if (msg.includes("login")) {
      response = "Check your credentials and try again.";
    } else if (msg.includes("register") || msg.includes("signup")) {
      response =
        "Make sure to use a unique email. Do not reuse existing emails. For payment issues, contact customer care.";
    } else if (msg.includes("payment")) {
      response = "If payment fails, contact our customer care for assistance.";
    } else if (msg.includes("hi") || msg.includes("hello")) {
      response =
        "Hi there! Welcome to Qwipo Support. How can I assist you today?";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
      setTyping(false);
    }, 1000);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    },
    container: {
      width: "100%",
      maxWidth: "800px",
      height: "90vh",
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    },
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "25px 30px",
      textAlign: "center",
      color: "white"
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "8px"
    },
    subtitle: {
      fontSize: "14px",
      opacity: "0.9",
      fontWeight: "400"
    },
    chatArea: {
      flex: 1,
      padding: "25px",
      overflowY: "auto",
      background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
    },
    messageContainer: {
      display: "flex",
      alignItems: "flex-end",
      marginBottom: "20px"
    },
    userMessage: {
      justifyContent: "flex-end"
    },
    botMessage: {
      justifyContent: "flex-start"
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "14px",
      margin: "0 12px"
    },
    botAvatar: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white"
    },
    userAvatar: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white"
    },
    messageBubble: {
      maxWidth: "70%",
      padding: "16px 20px",
      borderRadius: "20px",
      fontSize: "14px",
      lineHeight: "1.5",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
    },
    botBubble: {
      background: "white",
      color: "#2d3748",
      borderBottomLeftRadius: "5px",
      border: "1px solid #e2e8f0"
    },
    userBubble: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderBottomRightRadius: "5px"
    },
    typingIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 20px",
      background: "white",
      borderRadius: "20px",
      border: "1px solid #e2e8f0",
      maxWidth: "fit-content",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
    },
    dot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#667eea",
      animation: "bounce 1.4s infinite ease-in-out"
    },
    typingText: {
      fontSize: "12px",
      color: "#718096",
      fontWeight: "500"
    },
    inputContainer: {
      padding: "25px",
      background: "white",
      borderTop: "1px solid #e2e8f0"
    },
    form: {
      display: "flex",
      gap: "12px",
      alignItems: "center"
    },
    input: {
      flex: 1,
      padding: "16px 20px",
      borderRadius: "25px",
      border: "2px solid #e2e8f0",
      fontSize: "14px",
      background: "#f8fafc",
      outline: "none",
      transition: "all 0.3s ease"
    },
    inputFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)"
    },
    sendButton: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      padding: "16px 24px",
      borderRadius: "25px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
    },
    sendButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.5)"
    },
    sendButtonDisabled: {
      background: "#cbd5e0",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none"
    },
    footer: {
      padding: "15px",
      textAlign: "center",
      background: "#f8fafc",
      borderTop: "1px solid #e2e8f0",
      fontSize: "12px",
      color: "#718096"
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>24/7 Support</h1>
          <p style={styles.subtitle}>We're here to help you anytime 🚀</p>
        </div>

        {/* Chat Area */}
        <div style={styles.chatArea}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageContainer,
                ...(msg.sender === "user" ? styles.userMessage : styles.botMessage)
              }}
            >
              {msg.sender === "bot" && (
                <div style={{...styles.avatar, ...styles.botAvatar}}>
                  B
                </div>
              )}
              <div
                style={{
                  ...styles.messageBubble,
                  ...(msg.sender === "bot" ? styles.botBubble : styles.userBubble)
                }}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div style={{...styles.avatar, ...styles.userAvatar}}>
                  U
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {typing && (
            <div style={styles.typingIndicator}>
              <div style={{...styles.dot, animationDelay: "0s"}}></div>
              <div style={{...styles.dot, animationDelay: "0.2s"}}></div>
              <div style={{...styles.dot, animationDelay: "0.4s"}}></div>
              <span style={styles.typingText}>Bot is typing...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div style={styles.inputContainer}>
          <form style={styles.form} onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                ...styles.sendButton,
                ...(!input.trim() && styles.sendButtonDisabled)
              }}
              onMouseEnter={(e) => {
                if (input.trim()) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                if (input.trim()) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
                }
              }}
            >
              Send
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          © 2025 Qwipo. All rights reserved.
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}