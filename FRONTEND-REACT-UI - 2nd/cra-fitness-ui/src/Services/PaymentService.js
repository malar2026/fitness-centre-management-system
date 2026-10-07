import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/payments";

export const getPayments = () => {
    return axios.get(BASE_URL);
}

export const addPayment = (payment) => {
    return axios.post(BASE_URL, payment);
};
