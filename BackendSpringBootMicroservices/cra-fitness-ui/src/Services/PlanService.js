import axios from "axios";

const BASE_URL = "http://localhost:8080/api/plans";

export const getPlans = () => {
  return axios.get(BASE_URL);
};

export const addPlan = (plan) => {
  return axios.post(BASE_URL, plan);
};

export const deletePlan = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
