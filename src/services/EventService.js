import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/dtluat125/real-world-vue-2",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents(perPage = 2, page = 1) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`);
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },
};
