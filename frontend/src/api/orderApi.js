import axios from "axios";

const API = "http://localhost:5000/api/orders";

export const createOrder = (token, data) =>
  axios.post(`${API}/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrders = (token) =>
  axios.get(`${API}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
