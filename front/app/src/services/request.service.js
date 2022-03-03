import axios from "axios";

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const REQUEST_API_URL = "http://localhost:8080/api/requests/";
const GET_ALL_REQUESTS_BY_USER =
  "http://localhost:8080/api/requests/test/" + getCurrentUser().id;
const BOOK_API_URL = "http://localhost:8080/api/books/";
const UPDATE_CURRENT_USER =
  "http://localhost:8080/api/users/" + getCurrentUser().id;

const createRequest = (issuer, book, employee, authorizer, state) => {
  return axios
    .post(REQUEST_API_URL, {
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

const findAllRequestsByIssuer = () => {
  return axios.get(GET_ALL_REQUESTS_BY_USER).then((response) => {
    return response.data;
  });
};

const appendRequest = (requests) => {
  return axios
    .put(UPDATE_CURRENT_USER, {
      requests: requests,
    })
    .then((response) => {
      return response.data;
    });
};

const testPut = (username) => {
  return axios
    .put(UPDATE_CURRENT_USER, {
      username: username,
    })
    .then((response) => {
      return response.data;
    });
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

export default {
  createRequest,
  createBook,
  appendRequest,
  testPut,
  getCurrentUser,
  getCreatedBook,
  getCreatedRequest,
  findAllRequestsByIssuer,
};
