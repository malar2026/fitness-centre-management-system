import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "black" }}>
      <Link to="/members" style={{ color: "white", marginRight: "20px" }}>Members</Link>
      <Link to="/trainers" style={{ color: "white", marginRight: "20px" }}>Trainers</Link>
      <Link to="/plans" style={{ color: "white", marginRight: "20px" }}>Plans</Link>
      <Link to="/payments" style={{ color: "white" }}>Payments</Link>
    </nav>
  );
}

export default Navbar;
