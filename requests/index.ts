import axios from "axios";

export const API = {
  addList: (body) => axios.post("/api/lists/add", body),
};
