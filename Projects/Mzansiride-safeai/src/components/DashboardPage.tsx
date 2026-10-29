import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const fakeTrips = [
  {
    id: "trip_001",
    route: "Sandton → Soweto",
    driver: "Sipho M.",
    event: "Prolonged Stop",
    checkIn: "Confirmed safe",
    fare: "R85",
    status: "alert"
  },
  {
    id: "trip_002",
    route: "Rosebank → Alexandra",
    driver: "Thabo K.",
    event: "None",
    checkIn: "—",
    fare: "R60",
    status: "clean"
  }
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", paddingBottom: "80px" }}>

      {/* Header */}
      <div style={{
        background: "#111827",
        padding: "48px 24px 24px",
        borderBottom: "1px solid #1F2937"
      }}>
        <p style={{ color: "#10B981", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
          OVERVIEW
        </p>
        <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Safety Dashboard</h2>
      </div>

      <div style={{ padding: "24px" }}>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          {[
            { label: "Total Trips", value: "2", color: "#F9FAFB" },
            { label: "Alerts Triggered", value: "1", color: "#EF4444" },
            { label: "All Clear", value: "1", color: "#10B981" }
          ].map((stat) => (
            <div key={stat.label} style={{
              flex: 1,
              background: "#111827",
              borderRadius: "12px",
              padding: "16px 12px",
              border: "1px solid #1F2937",
              textAlign: "center"
            }}>
              <p style={{ color: stat.color, fontSize: "22px", fontWeight: 700 }}>{stat.value}</p>
              <p style={{ color: "#6B7280", fontSize: "11px", marginTop: "2px" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Fare comparison */}
        <div style={{
          background: "#111827",
          borderRadius: "16px",
          padding: "20px",
          border: "1px solid #1F2937",
          marginBottom: "20px"
        }}>
          <p style={{ color: "#9CA3AF", fontSize: "12px", fontWeight: 600, marginBottom: "12px" }}>
            FARE COMPARISON
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{
              flex: 1,
              background: "#1F2937",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center"
            }}>
              <p style={{ color: "#9CA3AF", fontSize: "12px" }}>Individual</p>
              <p style={{ fontSize: "22px", fontWeight: 700 }}>R85</p>
            </div>
            <div style={{
              flex: 1,
              background: "#064E3B",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
              border: "1px solid #10B981"
            }}>
              <p style={{ color: "#10B981", fontSize: "12px" }}>Shared</p>
              <p style={{ fontSize: "22px", fontWeight: 700 }}>R42</p>
              <p style={{ color: "#10B981", fontSize: "11px" }}>Save 50%</p>
            </div>
          </div>
        </div>

        {/* Trip list */}
        <p style={{ color: "#9CA3AF", fontSize: "12px", fontWeight: 600, marginBottom: "12px" }}>
          RECENT TRIPS
        </p>
        {fakeTrips.map((trip) => (
          <div key={trip.id} style={{
            background: "#111827",
            borderRadius: "16px",
            padding: "16px 20px",
            border: "1px solid #1F2937",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: "14px" }}>{trip.route}</p>
              <p style={{ color: "#6B7280", fontSize: "12px", marginTop: "2px" }}>{trip.driver}</p>
              <p style={{ color: "#6B7280", fontSize: "12px" }}>{trip.checkIn}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontWeight: 600 }}>{trip.fare}</p>
              <span style={{
                display: "inline-block",
                marginTop: "6px",
                padding: "3px 10px",
                borderRadius: "99px",
                fontSize: "11px",
                fontWeight: 600,
                background: trip.status === "alert" ? "#7F1D1D" : "#064E3B",
                color: trip.status === "alert" ? "#EF4444" : "#10B981"
              }}>
                {trip.event}
              </span>
            </div>
          </div>
        ))}

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            background: "#10B981",
            border: "none",
            borderRadius: "12px",
            padding: "16px",
            color: "#fff",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "8px"
          }}
        >
          Book Another Ride
        </button>

      </div>
      <BottomNav />
    </div>
  );
}
