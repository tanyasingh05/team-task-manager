import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-017f.up.railway.app/api",
});

export default API;