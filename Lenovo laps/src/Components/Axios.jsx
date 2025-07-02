import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Remove Authorization header if it exists (optional)
delete API.defaults.headers.common["Authorization"];

export default API;
