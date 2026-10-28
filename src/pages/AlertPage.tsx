import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Hardcoded AI response — replace with Bedrock API call later
const fakeAIResponse = `Your trip has had an unexpected stop for more than 3 minutes. 
This can happen for normal reasons like traffic, a flat tyre, or a detour. 
Your options are: (1) Confirm you are okay and continue, (2) Request a call from support, 
or (3) Share your location with your trusted contact. You are not alone.`;

export default function AlertPage() {
  const [response, setResponse] = useState<"safe" | "help" | null>(null);
  const [notified, setNotified] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-50 p-4">
      <div className="max-w-md mx-auto">

        {/* Alert banner */}
        <div className="bg-red-600 text-white rounded-2xl p-4 mb-4">
          <p className="text-lg font-bold">⚠️ Safety Alert</p>
          <p className="text-sm mt-1">
            Your trip has been stationary for an unusual amount of time.
          </p>
          <p className="text-xs opacity-70 mt-1">Event type: Prolonged Stop — SIMULATED</p>
        </div>

        {/* Check-in prompt */}
        {!response && (
          <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
            <p className="font-semibold text-gray-800 mb-3">Are you okay?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setResponse("safe")}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
              >
                ✅ I'm okay
              </button>
              <button
                onClick={() => setResponse("help")}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
              >
                🆘 I need help
              </button>
            </div>
          </div>
        )}

        {/* Response confirmation */}
        {response === "safe" && (
          <div className="bg-green-50 border border-green-300 rounded-2xl p-4 mb-4">
            <p className="text-green-700 font-semibold">✅ Response recorded: Passenger confirmed safe</p>
          </div>
        )}

        {response === "help" && (
          <div className="bg-red-100 border border-red-400 rounded-2xl p-4 mb-4">
            <p className="text-red-700 font-semibold">🆘 Alert escalated. Support notified. — SIMULATED</p>
          </div>
        )}

        {/* AI explanation */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
            AI Safety Assistant — Amazon Bedrock
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">{fakeAIResponse}</p>
        </div>

        {/* Trusted contact notification */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <p className="font-semibold text-gray-800 mb-2">Trusted Contact</p>
          <p className="text-sm text-gray-500 mb-3">Notify: Mom (+27 83 000 0000)</p>
          {!notified ? (
            <button
              onClick={() => setNotified(true)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Send Notification — SIMULATED
            </button>
          ) : (
            <p className="text-green-600 text-sm font-semibold">✅ Notification sent — SIMULATED</p>
          )}
        </div>

        {/* Back to dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-blue-600 text-sm underline"
        >
          View Dashboard
        </button>

      </div>
    </div>
  );
}
