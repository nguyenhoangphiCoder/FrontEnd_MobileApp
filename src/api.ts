import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.5:3000",
  // Thay URL này bằng URL thực tế của backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
