import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import RequestService from "../../services/request.service";
import axios from "axios";
import UserService from "../../services/user.service";
import BookService from "../../services/book.service";
import existingUserService from "../../services/existingUser.service";
//===========================
// //state ids:
//   "620f227f5a6cfa6ef8038ecb" = initial
//   "620f227f5a6cfa6ef8038ecc" = allocated
//   "620f227f5a6cfa6ef8038ecd" = review
//   "620f227f5a6cfa6ef8038ece" = empReview
//   "620f227f5a6cfa6ef8038ecf" = reqAuthorization
//   "620f227f5a6cfa6ef8038ed0" = rejected
//   "620f227f5a6cfa6ef8038ed1" = accepted
//===========================

const BoardModerator = () => {
  const initialRequestState = {
    id: null,
    issuer: {},
    book: {},
    employee: {},
    authorizer: {},
    state: {},
  };
  const currentUser = AuthService.getCurrentUser();

  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentRequest, setCurrentRequest] = useState({});
  const [currentBook, setCurrentBook] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("ffddfffddssfd ");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    retrieveBooks();
    retrieveUsers();
    mapRequests();
    retrieveAllRequests();

    console.log(requests);

    // return () => {
    //   abortController.abort();
    // };
    // retrieveSelectedBook(requests[1][1].book);

    // console.log(requests[1][1].book);
    // retrieveSelectedBook(requests[1][1].book);
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveSelectedBook = async (bookId) => {
    await BookService.get(bookId).then((response) => {
      setCurrentBook(response.data);
    });
  };

  const retrieveRequests = async () => {
    await RequestService.findAllRequestsByIssuer(currentUser.id).then(
      (response) => {
        const arr = Object.entries(response);
        setRequests(arr);
        console.log(requests);
      }
    );
  };

  const retrieveAllRequests = async () => {
    await RequestService.getAll().then((response) => {
      const arr = Object.entries(response.data);
      console.log(response.data);
      setRequests(arr);
    });
  };

  //book data
  const retrieveBooks = async () => {
    await BookService.getAll().then((response) => {
      const arr = Object.entries(response.data);
      setBooks(arr);
    });
  };

  const retrieveUsers = async () => {
    await existingUserService.getAll().then((response) => {
      const arr = Object.entries(response.data);
      setUsers(arr);
      console.log(arr);
    });
  };

  const retrieveBookTitle = (bookId) => {
    for (const book of books) {
      if (book[1]._id === bookId[0]) {
        return book[1].title;
      } else {
      }
    }
  };

  const retrieveBookAuthor = (bookId) => {
    for (const book of books) {
      if (book[1]._id === bookId[0]) {
        return book[1].author;
      } else {
      }
    }
  };

  const deleteRequest = (requestId) => {
    RequestService.deleteRequest(requestId);
  };

  const retrieveBookDesc = (bookId) => {
    for (const book of books) {
      if (book[1]._id === bookId[0]) {
        return book[1].description;
      } else {
      }
    }
  };

  const retrieveBookCategory = (bookId) => {
    for (const book of books) {
      if (book[1]._id === bookId[0]) {
        return book[1].category;
      } else {
      }
    }
  };

  const retrieveBookYear = (bookId) => {
    for (const book of books) {
      if (book[1]._id === bookId[0]) {
        return book[1].year;
      } else {
      }
    }
  };

  const retrieveBookLanguage = (bookId) => {
    for (const book of books) {
      if (book[1]._id === bookId[0]) {
        return book[1].language;
      } else {
      }
    }
  };

  const retrieveBookIsbn = (bookId) => {
    for (const book of books) {
      if (book[1]._id === bookId[0]) {
        return book[1].isbn;
      } else {
      }
    }
  };

  const retrieveBookPhoto = (bookId) => {
    for (const book of books) {
      if (book[1]._id === bookId[0]) {
        return book[1].photo;
      } else {
      }
    }
  };

  const retrieveUserName = (userId) => {
    for (const user of users) {
      if (user[1]._id === userId[0]) {
        console.log(user[1].username);
        return user[1].username;
      } else {
        console.log(user[1].username);
      }
    }
  };

  const retrieveEmployeeName = (userId) => {
    for (const user of users) {
      if (user[1]._id === userId[0]) {
        console.log(user[1].username);
        return user[1].username;
      } else {
        console.log(user[1].username);
      }
    }
  };

  const refreshList = () => {
    retrieveRequests();
    setCurrentRequest(null);
    setCurrentIndex(-1);
  };

  const setActiveRequest = (request, index) => {
    setCurrentRequest(request);
    setCurrentIndex(index);
  };

  const mapRequests = () => {
    requests > 0 && requests.map((request, index) => {});
  };

  const findByTitle = () => {
    RequestService.findByTitle(searchTitle)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((e) => {});
  };

  const stateDetect = (request) => {
    if (request[1].state[0] === "620f227f5a6cfa6ef8038ecb") {
      return "Awaiting Allocation";
    } else if (request[1].state[0] === "620f227f5a6cfa6ef8038ecc") {
      return "Request Allocated";
    } else if (request[1].state[0] === "620f227f5a6cfa6ef8038ecd") {
      return "Needs Changes";
    } else if (request[1].state[0] === "620f227f5a6cfa6ef8038ece") {
      return "Under Review";
    } else if (request[1].state[0] === "620f227f5a6cfa6ef8038ecf") {
      return "Needs Authorization";
    } else if (request[1].state[0] === "620f227f5a6cfa6ef8038ed0") {
      return "Request Rejected";
    } else if (request[1].state[0] === "620f227f5a6cfa6ef8038ed1") {
      return "Request Accepted";
    } else {
      return "No State";
    }
  };

  // const canEdit = (request) => {
  //   if (
  //     request[1].state[0] === "620f227f5a6cfa6ef8038ecb" ||
  //     request[1].state[0] === "620f227f5a6cfa6ef8038ecd"
  //   ) {
  //     // return <button className="btn btn-secondary">Edit</button>;
  //     return (
  //       <Link
  //         to={`/request/${request[1]._id}`}
  //         type="button"
  //         className="btn btn-secondary"
  //       >
  //         Edit
  //       </Link>
  //     );
  //   } else {
  //   }
  // };

  // const canDelete = (request) => {
  //   if (request[1].state[0] === "620f227f5a6cfa6ef8038ecb") {
  //     return (
  //       <button
  //         className="btn btn-secondary"
  //         onClick={() => deleteRequest(request[1]._id)}
  //       >
  //         Delete
  //       </button>
  //     );
  //   } else {
  //   }
  // };

  const canAllocate = (request) => {
    if (request[1].employee.length === 0) {
      return (
        <button
          className="btn btn-secondary"
          // onClick={() => deleteRequest(request[1]._id)}
          onClick={() => allocateRequest(request)}
        >
          Allocate
        </button>
      );
    } else if (
      request[1].state[0] === "620f227f5a6cfa6ef8038ecc" ||
      request[1].state[0] === "620f227f5a6cfa6ef8038ece"
    ) {
      return (
        <Link
          to={`/request/${request[1]._id}`}
          type="button"
          className="btn btn-secondary"
        >
          Manage Request
        </Link>
      );
    }
  };

  const updateRequest = async (request) => {
    await RequestService.update(currentRequest._id, currentRequest)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const allocateRequest = async (request) => {
    console.log(request);
    request[1].employee.push(currentUser.id);
    request[1].state[0] = "620f227f5a6cfa6ef8038ecc";
    await setCurrentRequest(request[1]);
    await console.log(currentRequest);

    await RequestService.updateRequest(request[1]._id, request[1]).then(
      (response) => {
        console.log(request[1]._id);
        console.log(request[1]);
        console.log(response.data);
      }
    );
    // request[1].employee.push(currentUser.id);
    // request[1].employee.push(currentUser.id);
    await console.log(request[1]);
  };

  const renderRequests = () => {
    return requests.map((request) => (
      <tr>
        <th scope="row">{retrieveBookTitle(request[1].book)}</th>
        <td>{retrieveBookAuthor(request[1].book)}</td>
        <td>{retrieveBookDesc(request[1].book)}</td>
        <td>{retrieveBookCategory(request[1].book)}</td>
        <td>{retrieveBookYear(request[1].book)}</td>
        <td>{retrieveBookLanguage(request[1].book)}</td>
        <td>{retrieveBookIsbn(request[1].book)}</td>
        <td>
          <img src={retrieveBookPhoto(request[1].book)}></img>
        </td>
        <td>{stateDetect(request)}</td>
        <td>{retrieveUserName(request[1].issuer)}</td>
        <td>{retrieveEmployeeName(request[1].employee)}</td>
        {/* <td>{canEdit(request)}</td>
        <td>{canDelete(request)}</td> */}
        <td>{canAllocate(request)}</td>
      </tr>
    ));
  };

  //   const checkAuth = () => {
  //     UserService.getUserBoard().then((response) => {
  //       console.log(response.data);
  //       if (response.data === "User Content.") {
  //         setAuthorized(true);
  //       }
  //   }
  // }

  const isAuth = async () => {
    await UserService.getModeratorBoard().then((response) => {
      if (response.data === "User Content.") {
        setAuthorized(true);
        return authorized;
      } else {
        setAuthorized(false);
        return authorized;
      }
    });
  };

  return (
    <div>
      {/* <h1>Requests</h1>
      <Link to={"/request"} type="button" className="btn btn-secondary">
        Create New Request
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Year</th>
            <th scope="col">Language</th>
            <th scope="col">Isbn</th>
            <th scope="col">photo</th>
            <th scope="col">State</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderRequests()}</tbody>
      </table> */}
      {isAuth() ? (
        <div>
          <h1>Requests</h1>
          {/* <Link to={"/request"} type="button" className="btn btn-secondary">
            Create New Request
          </Link> */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Year</th>
                <th scope="col">Language</th>
                <th scope="col">Isbn</th>
                <th scope="col">photo</th>
                <th scope="col">State</th>
                <th scope="col">User</th>
                <th scope="col">Employee</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{renderRequests()}</tbody>
          </table>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default BoardModerator;
