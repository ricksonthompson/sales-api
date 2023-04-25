import axios from "axios";

export const api = (token?: string) =>
  axios.create({
    baseURL: process.env.CORE_API_URL,
  });
