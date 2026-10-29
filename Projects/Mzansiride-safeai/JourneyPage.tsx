import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Fake driver data — replace with API response later
const fakeDriver = {
  name: "Sipho M.",
  vehicle: "White Toyota Corolla",
  plate: "GP 123-456",
  rating: 4.8,
  photo: "👨🏾‍✈️", // placeholder emoji
};

export default function JourneyPage() {
  const [safeModeActive, setSafeModeActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();

  // When Safe Journey Mode is activated, start a 10-second countdown
  // then trigger the safety event automatically
  useEffect(() => {
    if (!safeModeActive) return;

    let seconds = 10;
    setCountdown(seconds);

    const timer = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);

      if (seconds <= 0) {
        clearInterval(timer);
        navigate("/alert"); // move to alert screen
      }
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, [safeModeActive, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="bg-blue-600 text-white rounded-2xl p-4 mb-4">
          <p className="text-sm opacity-80">Trip in progress</p>
          <h2 className="text-xl font-bold">Sandton → Soweto</h2>
          <p className="text-sm mt-1">Estimated arrival: 28 mins</p>
        </div>

        {/* Driver card */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
            Your Driver — DEMO DATA
          </p>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{fakeDriver.photo}</span>
            <div>
              <p className="font-semibold text-gray-800">{fakeDriver.name}</p>
              <p className="text-sm text-gray-500">{fakeDriver.vehicle}</p>
              <p className="text-sm text-gray-500">Plate: {fakeDriver.plate}</p>
              <p className="text-sm text-yellow-500">★ {fakeDriver.rating}</p>
            </div>
          </div>
        </div>

        {/* Safe Journey Mode */}
        {!safeModeActive ? (
          <button
            onClick={() => setSafeModeActive(true)}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
          >
            🛡️ Activate Safe Journey Mode
          </button>
        ) : (
          <div className="bg-green-50 border border-green-300 rounded-2xl p-4 text-center">
            <p className="text-green-700 font-semibold">✅ Safe Journey Mode Active</p>
            <p className="text-sm text-gray-500 mt-1">Monitoring your trip...</p>

            {/* Countdown shown for demo purposes */}
            {countdown !== null && (
              <p className="text-xs text-gray-400 mt-2">
                Simulated event in {countdown}s
              </p>
            )}
          </div>
        )}

        {/* Dashboard link */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-4 text-blue-600 text-sm underline"
        >
          View Alert Dashboard
        </button>

      </div>
    </div>
  );
}
