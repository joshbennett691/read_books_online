import axios from "axios";
import http from "../http-common";

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const API_URL = "http://localhost:8080/api/requests/";
// const GET_ALL_REQUESTS_BY_USER =
//   "http://localhost:8080/api/requests/test/" + getCurrentUser().id;
const BOOK_API_URL = "http://localhost:8080/api/books/";
// const UPDATE_CURRENT_USER =
//   "http://localhost:8080/api/users/" + getCurrentUser().id;

const createRequest = (issuer, book, employee, authorizer, state) => {
  return axios
    .post(API_URL, {
      issuer,
      book,
      employee,
      authorizer,
      state,
    })
    .then((response) => {
      localStorage.setItem("request", JSON.stringify(response.data));
      return response.data;
    });
};

// const getRequest = (id) => {
//   axios.get(API_URL + id).then((response) => {
//     return response.data;
//   });
// };

const getRequest = (id) => {
  return http.get(`/requests/${id}`);
};

const findAllRequestsByIssuer = (issuerId) => {
  return axios.get(API_URL + "test/" + issuerId).then((response) => {
    return response.data;
  });
};

const updateRequest = (id, data) => {
  return http.put(`/requests/${id}`, data);
};

const createBook = (
  title,
  author,
  description,
  category,
  year,
  language,
  isbn,
  photo,
  approved
) => {
  return axios
    .post(BOOK_API_URL, {
      title,
      author,
      description,
      category,
      year,
      language,
      isbn,
      photo,
      approved,
    })
    .then((response) => {
      localStorage.setItem("book", JSON.stringify(response.data));

      return response.data;
    });
};

const getCreatedBook = () => {
  return JSON.parse(localStorage.getItem("book"));
};

const getCreatedRequest = () => {
  return JSON.parse(localStorage.getItem("request"));
};

const deleteRequest = (requestId) => {
  axios.delete(`http://localhost:8080/api/requests/${requestId}`);
};

const getAll = () => {
  return http.get("/requests");
};

const findByTitle = (title) => {
  return http.get(`/requests?title=${title}`);
};

export default {
  createRequest,
  createBook,
  getRequest,
  updateRequest,
  getCurrentUser,
  getCreatedBook,
  getCreatedRequest,
  findAllRequestsByIssuer,
  deleteRequest,
  getAll,
  findByTitle,
};
