import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getMeta = async () => {
  const res = await api.get("/wave/meta");
  return res.data;
};

export const getRange = async (from, to) => {
  const res = await api.get(`/wave?from=${from}&to=${to}`);
  return res.data;
};
