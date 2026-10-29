import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const fakeAIResponse = `Your ride has been stopped for an unusual amount of time. This can happen due to traffic, a flat tyre, or a route change. You have three options: confirm you're okay and continue, request a support call, or alert your trusted contact. You are not alone — we're monitoring your trip.`;

export default function AlertPage() {
  const [response, setResponse] = useState<"safe" | "help" | null>(null);
  const [notified, setNotified] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", paddingBottom: "80px" }}>

      {/* Alert header */}
      <div style={{
        background: "#7F1D1D",
        padding: "48px 24px 24px",
        borderBottom: "1px solid #991B1B"
      }}>
        <p style={{ color: "#FCA5A5", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
          SAFETY ALERT — SIMULATED
        </p>
        <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Unexpected Stop Detected</h2>
        <p style={{ color: "#FCA5A5", fontSize: "14px", marginTop: "4px" }}>
          Your ride has been stationary for 3+ minutes
        </p>
      </div>

      <div style={{ padding: "24px" }}>

        {/* Check in prompt */}
        {!response && (
          <div style={{
            background: "#111827",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #1F2937",
            marginBottom: "16px"
          }}>
            <p style={{ fontWeight: 600, fontSize: "17px", marginBottom: "16px" }}>
              Are you okay?
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setResponse("safe")}
                style={{
                  flex: 1,
                  background: "#064E3B",
                  border: "1px solid #10B981",
                  borderRadius: "12px",
                  padding: "14px",
                  color: "#10B981",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  cursor: "pointer"
                }}
              >
                ✅ I'm okay
              </button>
              <button
                onClick={() => setResponse("help")}
                style={{
                  flex: 1,
                  background: "#7F1D1D",
                  border: "1px solid #EF4444",
                  borderRadius: "12px",
                  padding: "14px",
                  color: "#EF4444",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  cursor: "pointer"
                }}
              >
                🆘 Need help
              </button>
            </div>
          </div>
        )}

        {/* Response confirmation */}
        {response === "safe" && (
          <div style={{
            background: "#064E3B",
            border: "1px solid #10B981",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "16px"
          }}>
            <p style={{ color: "#10B981", fontWeight: 600 }}>✅ Confirmed safe</p>
          </div>
        )}

        {response === "help" && (
          <div style={{
            background: "#7F1D1D",
            border: "1px solid #EF4444",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "16px"
          }}>
            <p style={{ color: "#EF4444", fontWeight: 600 }}>🆘 Support alerted — SIMULATED</p>
          </div>
        )}

        {/* AI explanation */}
        <div style={{
          background: "#111827",
          borderRadius: "16px",
          padding: "20px",
          border: "1px solid #1F2937",
          marginBottom: "16px"
        }}>
          <p style={{ color: "#6B7280", fontSize: "11px", fontWeight: 600, marginBottom: "10px" }}>
            AI SAFETY ASSISTANT · AMAZON BEDROCK
          </p>
          <p style={{ color: "#D1D5DB", fontSize: "14px", lineHeight: "1.6" }}>
            {fakeAIResponse}
          </p>
        </div>

        {/* Trusted contact */}
        <div style={{
          background: "#111827",
          borderRadius: "16px",
          padding: "20px",
          border: "1px solid #1F2937"
        }}>
          <p style={{ fontWeight: 600, marginBottom: "4px" }}>Trusted Contact</p>
          <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "16px" }}>
            Mom · +27 83 000 0000
          </p>
          {!notified ? (
            <button
              onClick={() => setNotified(true)}
              style={{
                width: "100%",
                background: "#1D4ED8",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                color: "#fff",
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              Send Alert — SIMULATED
            </button>
          ) : (
            <p style={{ color: "#10B981", fontWeight: 600, fontSize: "14px" }}>
              ✅ Notification sent — SIMULATED
            </p>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
