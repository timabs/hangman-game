import axios from "axios";

const baseURL = "https://api.api-ninjas.com";
const apiKey = import.meta.env.VITE_API_KEY;
const api = axios.create({
  baseURL,
  headers: {
    "X-Api-Key": apiKey,
  },
});

export const getRandomWord = async () => {
  try {
    const response = await api.get(`/v1/randomword`);
    return response.data.word;
  } catch (error) {
    console.log(error);
  }
};
