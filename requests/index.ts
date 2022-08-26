import axios from "axios";

export const API = {
  addList: (body: { name: string; owner: string }) =>
    axios.post("/api/lists/add", body),
  addAddress: (
    listId: number,
    body: { amount: number; address: string; chain: number }
  ) => axios.post(`/api/lists/${listId}/add`, body),
};
