import axios from "axios";

const api = axios.create({
    baseURL: "https://student-task-management-system-backend.onrender.com/tasks/summary",
});

export default api;
