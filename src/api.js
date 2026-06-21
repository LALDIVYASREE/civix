// src/api.js
import axios from "axios";

export const API_BASE_URL = "http://13.201.69.69:5000";

// Create an axios instance so you can reuse it everywhere
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
