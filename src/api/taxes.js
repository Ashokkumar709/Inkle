import axios from "axios";

const BASE_URL =
  "https://685013d7e7c42cfd17974a33.mockapi.io";

export const fetchTaxes = async () => {
  const res = await axios.get(`${BASE_URL}/taxes`);
  return res.data;
};

export const updateTax = async (id, payload) => {
  const res = await axios.put(
    `${BASE_URL}/taxes/${id}`,
    payload
  );
  return res.data;
};
