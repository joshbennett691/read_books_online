import http from "../http-common";
import axios from "axios";

const API_URL = "http://localhost:8080/api/chats/";

const getAll = () => {
  return http.get("/chats");
};

const get = (id) => {
  return http.get(`/chats/${id}`);
};

// const create = (data) => {
//   return http.post("/chats", data);
// };

const create = (issuer, employee, messages) => {
  return axios
    .post(API_URL, {
      issuer,
      employee,
      messages,
    })
    .then((response) => {
      return response.data;
    });
};

const update = (id, data) => {
  return http.put(`/chats/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/chats/${id}`);
};

const removeAll = () => {
  return http.delete(`/chats`);
};

const findByTitle = (title) => {
  return http.get(`/chats?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
