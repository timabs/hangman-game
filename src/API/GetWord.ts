import axios from "axios";

const baseURL = "https://api.api-ninjas.com/v1/randomword";
const apiKey = import.meta.env.VITE_API_KEY;
const api = axios.create({
  baseURL,
  headers: {
    "X-Api-Key": apiKey,
  },
});
