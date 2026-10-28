import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingPage() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fareEstimate, setFareEstimate] = useState<number | null>(null);
  const navigate = useNavigate(); // this is how you move to another screen

  const handleRequestRide = () => {
    if (!pickup || !destination) {
      alert("Please enter both pickup and destination.");
      return;
    }
    // Hardcoded fare for now — replace with API call later
    setFareEstimate(85);
  };

  const handleConfirmRide = () => {
    // Move to journey screen
    navigate("/journey");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🚗 MzansiRide SafeAI
        </h1>

        {/* Pickup input */}
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Pickup Location
        </label>
        <input
          type="text"
          placeholder="e.g. Sandton City"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Destination input */}
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Destination
        </label>
        <input
          type="text"
          placeholder="e.g. Soweto"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Request ride button */}
        <button
          onClick={handleRequestRide}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Request Ride
        </button>

        {/* Fare estimate — only shows after button click */}
        {fareEstimate && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-600 text-sm">Estimated Fare</p>
            <p className="text-2xl font-bold text-gray-800">R{fareEstimate}</p>
            <p className="text-sm text-green-600 mt-1">
              💡 Shared ride option: R{Math.round(fareEstimate / 2)} (save 50%)
            </p>

            <button
              onClick={handleConfirmRide}
              className="w-full mt-4 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
            >
              Confirm & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
