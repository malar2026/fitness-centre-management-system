import axios from "axios";

const TRAINER_API = "http://localhost:8080/api/trainers";

export const getAllTrainers = () => axios.get(TRAINER_API);
