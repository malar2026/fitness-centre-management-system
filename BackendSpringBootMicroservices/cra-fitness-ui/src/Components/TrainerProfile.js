import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllTrainers } from "../Services/TrainerService";
import { useNavigate } from "react-router-dom";

export default function TrainerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();   // 👈 add this
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    getAllTrainers().then(res => {
      const found = res.data.find(t => t.id === parseInt(id));
      setTrainer(found);
    });
  }, [id]);

  if (!trainer)
    return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen p-10">

     
      <h1 className="text-3xl text-red-500 font-bold mb-4">
        {trainer.name}
	{/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
      >
        Back
      </button>

      </h1>
 

      <p className="mb-2">
        <strong>Specialization:</strong> {trainer.specialization}
      </p>

      <p>
        <strong>Experience:</strong> {trainer.experience || "5 Years"}
      </p>
    </div>
  );
}