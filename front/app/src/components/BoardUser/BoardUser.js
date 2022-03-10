import React, { useEffect, useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import RequestService from "../../services/request.service";
import axios from "axios";
import UserService from "../../services/user.service";
import BookService from "../../services/book.service";
import EventBus from "../../common/EventBus";
import Chat from "../Chat/Chat";

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

const BoardUser = () => {
  const currentUser = AuthService.getCurrentUser();

  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [content, setContent] = useState("");

  const [currentBook, setCurrentBook] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent("Requests");
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent("Invalid Access");

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    isAuth();
    retrieveRequests();
    retrieveBooks();
    mapRequests();
    console.log(requests);
    console.log("tesssstddfsssf");
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
      console.log(response.data);
      setCurrentBook(response.data);
    });
  };

  const retrieveRequests = async () => {
    await RequestService.findAllRequestsByIssuer(currentUser.id).then(
      (response) => {
        const arr = Object.entries(response);
        setRequests(arr);
        // console.log(requests);
      }
    );
  };

  //book data
  const retrieveBooks = async () => {
    await BookService.getAll().then((response) => {
      const arr = Object.entries(response.data);
      setBooks(arr);
      console.log(books);
    });
  };

  const retrieveBookTitle = (bookId) => {
    for (const book of books) {
      console.log("===============");
      console.log(book[1]._id);
      console.log(bookId[0]);
      console.log("===============");

      if (book[1]._id === bookId[0]) {
        console.log("success");
        return book[1].title;
      } else {
        console.log("fail");
      }
    }
  };

  const retrieveBookAuthor = (bookId) => {
    for (const book of books) {
      console.log("===============");
      console.log(book[1]);
      console.log(bookId[0]);
      console.log("===============");

      if (book[1]._id === bookId[0]) {
        console.log("success");
        return book[1].author;
      } else {
        console.log("fail");
      }
    }
  };

  const deleteRequest = (requestId) => {
    RequestService.deleteRequest(requestId);
    console.log("Request Deleted");
    window.location.reload(true);
  };

  const retrieveBookDesc = (bookId) => {
    for (const book of books) {
      console.log("===============");
      console.log(book[1]);
      console.log(bookId[0]);
      console.log("===============");

      if (book[1]._id === bookId[0]) {
        console.log("success");
        return book[1].description;
      } else {
        console.log("fail");
      }
    }
  };

  const retrieveBookCategory = (bookId) => {
    for (const book of books) {
      console.log("===============");
      console.log(book[1]);
      console.log(bookId[0]);
      console.log("===============");

      if (book[1]._id === bookId[0]) {
        console.log("success");
        return book[1].category;
      } else {
        console.log("fail");
      }
    }
  };

  const retrieveBookYear = (bookId) => {
    for (const book of books) {
      console.log("===============");
      console.log(book[1]);
      console.log(bookId[0]);
      console.log("===============");

      if (book[1]._id === bookId[0]) {
        console.log("success");
        return book[1].year;
      } else {
        console.log("fail");
      }
    }
  };

  const retrieveBookLanguage = (bookId) => {
    for (const book of books) {
      console.log("===============");
      console.log(book[1]);
      console.log(bookId[0]);
      console.log("===============");

      if (book[1]._id === bookId[0]) {
        console.log("success");
        return book[1].language;
      } else {
        console.log("fail");
      }
    }
  };

  const retrieveBookIsbn = (bookId) => {
    for (const book of books) {
      console.log("===============");
      console.log(book[1]);
      console.log(bookId[0]);
      console.log("===============");

      if (book[1]._id === bookId[0]) {
        console.log("success");
        return book[1].isbn;
      } else {
        console.log("fail");
      }
    }
  };

  const retrieveBookPhoto = (bookId) => {
    for (const book of books) {
      console.log("===============");
      console.log(book[1]);
      console.log(bookId[0]);
      console.log("===============");

      if (book[1]._id === bookId[0]) {
        console.log("success");
        return book[1].photo;
      } else {
        console.log("fail");
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
    requests > 0 &&
      requests.map((request, index) => {
        console.log(request);
      });
  };

  const findByTitle = () => {
    RequestService.findByTitle(searchTitle)
      .then((response) => {
        console.log(requests);
        console.log(currentUser);
        console.log(response.data);
        setRequests(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const stateDetect = (request) => {
    console.log(request[1]);
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
      console.log(request[1].state[0]);
      return "No State";
    }
  };

  const timeDisplay = (requestTime) => {
    let updatedTime = requestTime.replace(/\D/g, "");
    let output = [updatedTime.slice(0, 4), "-", updatedTime.slice(4)].join("");
    output = [output.slice(0, 7), "-", output.slice(7)].join("");
    output = [output.slice(0, 10), " ", output.slice(10)].join("");
    output = [output.slice(0, 13), "-", output.slice(13)].join("");
    output = [output.slice(0, 16), "-", output.slice(16)].join("");
    output = [output.slice(0, 19), "-", output.slice(19)].join("");
    output = output.slice(0, -4);
    return output;
  };

  const canEdit = (request) => {
    console.log(request[1]);
    if (
      request[1].state[0] === "620f227f5a6cfa6ef8038ecb" ||
      request[1].state[0] === "620f227f5a6cfa6ef8038ecd"
    ) {
      // return <button className="btn btn-secondary">Edit</button>;
      return (
        <Link
          to={`/request/${request[1]._id}`}
          type="button"
          className="btn btn-secondary"
        >
          Edit
        </Link>
      );
    } else {
    }
  };

  const canDelete = (request) => {
    if (request[1].state[0] === "620f227f5a6cfa6ef8038ecb") {
      return (
        <button
          className="btn btn-secondary"
          onClick={() => deleteRequest(request[1]._id)}
        >
          Delete
        </button>
      );
    } else {
    }
  };

  const canChat = (request) => {
    if (request[1].employee.length > 0) {
      return (
        <Link
          to={`/chat/${request[1]._id}`}
          type="button"
          className="btn btn-secondary"
        >
          Chat
        </Link>
      );
    }
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
        <td>{timeDisplay(request[1].updatedAt)}</td>
        <td>{canEdit(request)}</td>
        <td>{canChat(request)}</td>
        <td>{canDelete(request)}</td>
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
    await UserService.getUserBoard().then((response) => {
      console.log(response.data);
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
    <div data-testid="form-render">
      {currentUser ? (
        <div>
          <h1>{content}</h1>

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
                <th scope="col">Last Update</th>
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

export default BoardUser;
