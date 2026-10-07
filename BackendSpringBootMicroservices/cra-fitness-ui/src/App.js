import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Members from "./Components/Members";
import Trainers from "./Components/Trainers";
import Plans from "./Components/Plans";
import Payments from "./Components/Payments";
import TrainerProfile from "./Components/TrainerProfile";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
	  <Route path="/" element={<Navigate to="/members" />} />
          <Route path="/members" element={<Members />} />
          <Route path="/trainers" element={<Trainers />} />
	  <Route path="/trainers/:id" element={<TrainerProfile />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;






