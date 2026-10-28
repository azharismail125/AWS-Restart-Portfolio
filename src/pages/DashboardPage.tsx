import { useNavigate } from "react-router-dom";

// Hardcoded trip data — replace with DynamoDB reads later
const fakeTrips = [
  {
    id: "trip_001",
    route: "Sandton → Soweto",
    driver: "Sipho M.",
    status: "Completed",
    event: "Prolonged Stop",
    checkIn: "Passenger confirmed safe",
    fare: "R85",
  },
  {
    id: "trip_002",
    route: "Rosebank → Alexandra",
    driver: "Thabo K.",
    status: "Completed",
    event: "None",
    checkIn: "—",
    fare: "R60",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          📊 Safety Dashboard — DEMO
        </h1>

        {/* Trip table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="p-3 text-left">Trip</th>
                <th className="p-3 text-left">Driver</th>
                <th className="p-3 text-left">Event</th>
                <th className="p-3 text-left">Check-in</th>
                <th className="p-3 text-left">Fare</th>
              </tr>
            </thead>
            <tbody>
              {fakeTrips.map((trip) => (
                <tr key={trip.id} className="border-t border-gray-100">
                  <td className="p-3 text-gray-800">{trip.route}</td>
                  <td className="p-3 text-gray-600">{trip.driver}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trip.event === "None"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {trip.event}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 text-xs">{trip.checkIn}</td>
                  <td className="p-3 text-gray-800 font-medium">{trip.fare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fare comparison */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">💸 Fare Comparison</h2>
          <div className="flex gap-4">
            <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Individual Ride</p>
              <p className="text-2xl font-bold text-gray-800">R85</p>
            </div>
            <div className="flex-1 bg-green-50 rounded-lg p-3 text-center border border-green-200">
              <p className="text-xs text-green-600">Shared Ride</p>
              <p className="text-2xl font-bold text-green-700">R42</p>
              <p className="text-xs text-green-500">Save 50%</p>
            </div>
          </div>
        </div>

        {/* Back to booking */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Book Another Ride
        </button>

      </div>
    </div>
  );
}
