// src/pages/OrderTracking.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [coords, setCoords] = useState(null);
  const [driverCoords, setDriverCoords] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const selectedOrder = orders[orderId];
    setOrder(selectedOrder);

    if (selectedOrder?.address) {
      const query = `${selectedOrder.address}, ${selectedOrder.pincode}, ${selectedOrder.state}, India`;
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const deliveryCoords = [
              parseFloat(data[0].lat),
              parseFloat(data[0].lon),
            ];
            setCoords(deliveryCoords);

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) =>
                  setDriverCoords([
                    position.coords.latitude,
                    position.coords.longitude,
                  ]),
                () => setDriverCoords(deliveryCoords)
              );
            } else {
              setDriverCoords(deliveryCoords);
            }
          }
        })
        .catch(() => {
          setCoords(null);
          setDriverCoords(null);
        });
    }
  }, [orderId]);

  useEffect(() => {
    if (!coords || !driverCoords) return;

    let step = 0;
    const totalSteps = 30;

    const interval = setInterval(() => {
      step++;
      const newProgress = Math.min(100, Math.round((step / totalSteps) * 100));
      setProgress(newProgress);

      if (step < totalSteps * 0.3) setStatus("Pending");
      else if (step < totalSteps * 0.8) setStatus("Out for Delivery");
      else setStatus("Delivered");

      const latDiff = (coords[0] - driverCoords[0]) / (totalSteps - step + 1);
      const lonDiff = (coords[1] - driverCoords[1]) / (totalSteps - step + 1);
      setDriverCoords((prev) => [prev[0] + latDiff, prev[1] + lonDiff]);

      if (step >= totalSteps) clearInterval(interval);
    }, 800);

    return () => clearInterval(interval);
  }, [coords, driverCoords]);

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f0f2f5",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "700px",
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
      padding: "30px",
      textAlign: "center",
    },
    title: {
      color: "#6a11cb",
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "25px",
    },
    orderCard: {
      background: "#f8f8f8",
      padding: "20px 25px",
      borderRadius: "15px",
      marginBottom: "25px",
      textAlign: "left",
    },
    orderText: {
      fontSize: "1.1rem",
      margin: "10px 0",
    },
    status: {
      fontWeight: "700",
      padding: "6px 15px",
      borderRadius: "20px",
      color: "#fff",
      fontSize: "0.95rem",
    },
    statusColors: {
      Pending: { backgroundColor: "#3498db" },
      "Out for Delivery": { backgroundColor: "#e67e22" },
      Delivered: { backgroundColor: "#2ecc71" },
    },
    mapContainer: {
      width: "100%",
      height: "400px",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      marginBottom: "15px",
    },
    progressBarContainer: {
      width: "100%",
      background: "#e0e0e0",
      borderRadius: "10px",
      height: "12px",
      marginTop: "15px",
    },
    progressBar: {
      height: "100%",
      borderRadius: "10px",
      background: "linear-gradient(90deg, #6a11cb, #a4508b)",
      transition: "width 0.5s ease",
    },
    loadingText: {
      fontSize: "1rem",
      color: "#555",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Order Tracking</h1>

        {order ? (
          <>
            <div style={styles.orderCard}>
              <p style={styles.orderText}>
                <strong>Status:</strong>{" "}
                <span style={{ ...styles.status, ...styles.statusColors[status] }}>
                  {status}
                </span>
              </p>
              <div style={styles.progressBarContainer}>
                <div style={{ ...styles.progressBar, width: `${progress}%` }} />
              </div>
              <p style={styles.orderText}>
                <strong>Delivery Address:</strong> {order.address}, {order.pincode}, {order.state}
              </p>
              <p style={styles.orderText}>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p style={styles.orderText}>
                <strong>Payment Method:</strong> {order.method}
              </p>
              <p style={styles.orderText}>
                <strong>Amount Paid:</strong> ₹{order.totalPaid?.toFixed(2)}
              </p>
            </div>

            {coords && driverCoords ? (
              <div style={styles.mapContainer}>
                <MapContainer center={coords} zoom={13} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={driverCoords} icon={truckIcon}>
                    <Popup>Delivery Vehicle</Popup>
                  </Marker>
                  <Marker position={coords}>
                    <Popup>Customer Location</Popup>
                  </Marker>
                  <Polyline positions={[driverCoords, coords]} color="#6a11cb" />
                </MapContainer>
              </div>
            ) : (
              <p style={styles.loadingText}>Loading map...</p>
            )}
          </>
        ) : (
          <p style={styles.loadingText}>No order found</p>
        )}
      </div>
    </div>
  );
}
