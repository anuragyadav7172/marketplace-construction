import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const getCart = (token) =>
  axios.get(`${API}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = (token, productId, qty = 1) =>
  axios.post(
    `${API}/add`,
    { productId, quantity: qty },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const updateCart = (token, productId, qty) =>
  axios.put(
    `${API}/update`,
    { productId, quantity: qty },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const removeItem = (token, productId) =>
  axios.delete(`${API}/remove/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
