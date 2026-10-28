import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import JourneyPage from "./pages/JourneyPage";
import AlertPage from "./pages/AlertPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/alert" element={<AlertPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
