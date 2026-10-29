import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: "/", icon: "🚗", label: "Book" },
    { path: "/journey", icon: "🛡️", label: "Journey" },
    { path: "/alert", icon: "⚠️", label: "Alert" },
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
  ];

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#111827",
      borderTop: "1px solid #1F2937",
      display: "flex",
      zIndex: 50
    }}>
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              padding: "12px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: active ? "#10B981" : "#6B7280",
              fontSize: "11px",
              fontFamily: "Inter, sans-serif",
              fontWeight: active ? 600 : 400,
              borderTop: active ? "2px solid #10B981" : "2px solid transparent"
            }}
          >
            <span style={{ fontSize: "18px" }}>{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
