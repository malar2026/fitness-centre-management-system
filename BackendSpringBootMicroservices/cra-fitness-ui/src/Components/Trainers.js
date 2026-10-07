import React, { useEffect, useState } from "react";
import { getAllTrainers } from "../Services/TrainerService";
import { useNavigate } from "react-router-dom";
import "./UIElements.css";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTrainers()
      .then(res => {
        setTrainers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const specializations = [
    ...new Set(trainers.map(t => t.specialization))
  ];

  const filtered = trainers.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialization =
      selectedSpecialization === "" ||
      t.specialization.toLowerCase() ===
        selectedSpecialization.toLowerCase();

    return matchesSearch && matchesSpecialization;
  });

  const clearFilters = () => {
    setSearch("");
    setSelectedSpecialization("");
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 md:px-16 py-10">

      {/* Title */}
      <h1 className="text-4xl font-bold text-red-500 mb-8 tracking-wide">
        Meet Our Trainers
      </h1>

      {/* Sticky Filter Bar */}
      <div className="sticky top-4 z-10 bg-black/80 backdrop-blur-md p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 mb-8">

        {/* Specialization */}
        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className="status-select"
        >
          <option value="">All Specializations</option>
          {specializations.map((spec, index) => (
            <option key={index} value={spec}>
              {spec}
            </option>
          ))}
        </select>

      </div>

     
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <h2 className="text-2xl mb-2">No Trainers Found</h2>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(trainer => (
            <div
              key={trainer.id}
              className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-red-500/30 transform hover:scale-105 transition duration-300"
            >
             
              <h2 className="text-xl font-bold mb-2">
                {trainer.name}
              </h2>

              <p className="text-gray-400 mb-4">
                {trainer.specialization}
              </p>

              <button
  onClick={() => navigate(`/trainers/${trainer.id}`)}
  className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
>
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}