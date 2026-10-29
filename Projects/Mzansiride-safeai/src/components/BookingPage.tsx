import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { requestRide } from "../services/api";

export default function BookingPage() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fareEstimate, setFareEstimate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestRide = async () => {
    if (!pickup || !destination) return;
    setLoading(true);
    try {
      await requestRide(pickup, destination);
      setFareEstimate(85);
    } catch {
      setFareEstimate(85); // fallback for demo
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    background: "#1F2937",
    border: "1px solid #374151",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "#F9FAFB",
    fontSize: "15px",
    fontFamily: "Inter, sans-serif",
    outline: "none",
    marginBottom: "12px"
  };

  const labelStyle = {
    fontSize: "12px",
    color: "#9CA3AF",
    marginBottom: "6px",
    display: "block",
    fontWeight: 500
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", paddingBottom: "80px" }}>

      {/* Header */}
      <div style={{
        padding: "48px 24px 24px",
        background: "linear-gradient(180deg, #111827 0%, #0A0F1E 100%)"
      }}>
        <p style={{ color: "#10B981", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
          MZANSIRIDE
        </p>
        <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#F9FAFB" }}>
          Where to?
        </h1>
      </div>

      <div style={{ padding: "0 24px" }}>

        {/* Input card */}
        <div style={{
          background: "#111827",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "16px",
          border: "1px solid #1F2937"
        }}>
          <label style={labelStyle}>Pickup</label>
          <input
            style={inputStyle}
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
          <label style={labelStyle}>Destination</label>
          <input
            style={{ ...inputStyle, marginBottom: 0 }}
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Request button */}
        <button
          onClick={handleRequestRide}
          disabled={loading || !pickup || !destination}
          style={{
            width: "100%",
            background: pickup && destination ? "#10B981" : "#1F2937",
            color: pickup && destination ? "#fff" : "#6B7280",
            border: "none",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            cursor: pickup && destination ? "pointer" : "not-allowed",
            transition: "all 0.2s"
          }}
        >
          {loading ? "Finding your ride..." : "Request Ride"}
        </button>

        {/* Fare estimate */}
        {fareEstimate && (
          <div style={{ marginTop: "20px" }}>
            <div style={{
              background: "#111827",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #1F2937",
              marginBottom: "12px"
            }}>
              <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "8px" }}>
                Fare estimate
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{
                  flex: 1,
                  background: "#1F2937",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center"
                }}>
                  <p style={{ color: "#9CA3AF", fontSize: "12px", marginBottom: "4px" }}>Individual</p>
                  <p style={{ color: "#F9FAFB", fontSize: "22px", fontWeight: 700 }}>R85</p>
                </div>
                <div style={{
                  flex: 1,
                  background: "#064E3B",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center",
                  border: "1px solid #10B981"
                }}>
                  <p style={{ color: "#10B981", fontSize: "12px", marginBottom: "4px" }}>Shared — save 50%</p>
                  <p style={{ color: "#F9FAFB", fontSize: "22px", fontWeight: 700 }}>R42</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/journey")}
              style={{
                width: "100%",
                background: "#10B981",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                cursor: "pointer"
              }}
            >
              Confirm Ride
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
