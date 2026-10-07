import React, { useEffect, useState } from "react";
import { getPlans, addPlan, deletePlan } from "../Services/PlanService";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    getPlans().then((res) => {
      setPlans(res.data);
    });
  };

  const savePlan = () => {
    const plan = { name, duration, price };

    addPlan(plan).then(() => {
      loadPlans();
      setName("");
      setDuration("");
      setPrice("");
    });
  };

  const removePlan = (id) => {
    deletePlan(id).then(() => loadPlans());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Fitness Plans</h2>

      {/* Add Plan Form */}
      <input
        placeholder="Plan Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Duration (e.g. 3 Months)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={savePlan}>Add Plan</button>

      <hr />

      {/* Plans List */}
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <b>{plan.name}</b> – {plan.duration} – ₹{plan.price}
            <button
              onClick={() => removePlan(plan.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plans;
