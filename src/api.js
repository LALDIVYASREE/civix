// src/api.js
import axios from "axios";

export const API_BASE_URL = "https://project-backend-i2n7.onrender.com";

// Create an axios instance so you can reuse it everywhere
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
