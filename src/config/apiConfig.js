import axios from "axios";

export const API_BASE_URL = "https://ecommerce-be-nodejs.onrender.com";

const jwt = localStorage.getItem("jwt");

export const api = axios.create({
   baseURL: API_BASE_URL,
   withCredentials: true,
   headers: jwt
      ? {
           Authorization: `Bearer ${jwt}`,
           "Content-Type": "application/json",
        }
      : { "Content-Type": "application/json" },
});
