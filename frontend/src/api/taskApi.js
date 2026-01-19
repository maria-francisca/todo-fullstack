import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createTask = async (title) => {
  const res = await axios.post(API_URL, {
    title,
    completed: false,
  });
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const toggleTask = async ({ id, completed }) => {
  const res = await axios.patch(`${API_URL}/${id}`, {
    completed,
  });
  return res.data;
};

export const changeTitle = async ({ id, title }) => {
  const res = await axios.put(`${API_URL}/${id}/title`, {
    title
  });
  return res.data;
};