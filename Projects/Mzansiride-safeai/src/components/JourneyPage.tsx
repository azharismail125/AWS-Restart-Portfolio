import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function JourneyPage() {
  const [safeModeActive, setSafeModeActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!safeModeActive) return;
    let seconds = 10;
    setCountdown(seconds);
    const timer = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);
      if (seconds <= 0) {
        clearInterval(timer);
        navigate("/alert");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [safeModeActive, navigate]);

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", paddingBottom: "80px" }}>

      {/* Trip header */}
      <div style={{
        background: "#111827",
        padding: "48px 24px 24px",
        borderBottom: "1px solid #1F2937"
      }}>
        <p style={{ color: "#10B981", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
          TRIP IN PROGRESS
        </p>
        <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Sandton → Soweto</h2>
        <p style={{ color: "#9CA3AF", fontSize: "14px", marginTop: "4px" }}>
          Estimated arrival: 28 mins
        </p>
      </div>

      <div style={{ padding: "24px" }}>

        {/* Driver card */}
        <div style={{
          background: "#111827",
          borderRadius: "16px",
          padding: "20px",
          border: "1px solid #1F2937",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            background: "#1F2937",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px"
          }}>
            👨🏾‍✈️
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: "16px" }}>Sipho M.</p>
            <p style={{ color: "#9CA3AF", fontSize: "13px" }}>White Toyota Corolla</p>
            <p style={{ color: "#9CA3AF", fontSize: "13px" }}>GP 123-456</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#FBBF24", fontSize: "14px", fontWeight: 600 }}>★ 4.8</p>
            <p style={{ color: "#6B7280", fontSize: "11px" }}>DEMO</p>
          </div>
        </div>

        {/* Trip progress bar */}
        <div style={{
          background: "#111827",
          borderRadius: "16px",
          padding: "20px",
          border: "1px solid #1F2937",
          marginBottom: "16px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <p style={{ color: "#9CA3AF", fontSize: "13px" }}>Sandton</p>
            <p style={{ color: "#9CA3AF", fontSize: "13px" }}>Soweto</p>
          </div>
          <div style={{ background: "#1F2937", borderRadius: "99px", height: "6px" }}>
            <div style={{
              background: "#10B981",
              width: "35%",
              height: "100%",
              borderRadius: "99px"
            }} />
          </div>
          <p style={{ color: "#6B7280", fontSize: "12px", marginTop: "8px", textAlign: "center" }}>
            35% complete
          </p>
        </div>

        {/* Safe mode button */}
        {!safeModeActive ? (
          <button
            onClick={() => setSafeModeActive(true)}
            style={{
              width: "100%",
              background: "#064E3B",
              border: "1px solid #10B981",
              borderRadius: "16px",
              padding: "20px",
              color: "#10B981",
              fontSize: "16px",
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            🛡️ Activate Safe Journey Mode
          </button>
        ) : (
          <div style={{
            background: "#064E3B",
            border: "1px solid #10B981",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center"
          }}>
            <p style={{ color: "#10B981", fontWeight: 600, fontSize: "16px" }}>
              ✅ Safe Journey Mode Active
            </p>
            <p style={{ color: "#6B7280", fontSize: "13px", marginTop: "4px" }}>
              Monitoring your trip...
            </p>
            {countdown !== null && (
              <p style={{ color: "#374151", fontSize: "12px", marginTop: "8px" }}>
                Simulated event in {countdown}s
              </p>
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
