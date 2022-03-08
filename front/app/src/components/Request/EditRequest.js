import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import BookService from "../../services/book.service";
import axios from "axios";
import RequestService from "../../services/request.service";
import AuthService from "../../services/auth.service";

const EditRequest = (props) => {
  const initialRequestState = {
    id: null,
    issuer: {},
    book: {},
    employee: {},
    authorizer: {},
    state: {},
  };
  const initialBookState = {
    id: null,
    title: "",
    author: "",
    description: "",
    category: "",
    year: 0,
    language: "",
    isbn: "",
    photo: "",
    approved: null,
  };
  const currentUser = AuthService.getCurrentUser();
  const [currentRequest, setCurrentRequest] = useState(initialRequestState);
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [message, setMessage] = useState("");
  const [cost, setCost] = useState(0);
  const [costThreshold, setCostThreshold] = useState(50);
  const [costMessage, setCostMessage] = useState("Purchase Book");
  const [styleCost, setStyleCost] = useState("btn btn-success");

  //props.match.params.id IS THE REQUEST ID NOT BOOK

  //currentRequest.book[0] IS THE ACCESSOR FOR BOOK ID

  useEffect(() => {
    console.log(currentUser);
    // retrieveBook(props.match.params.id);
    retrieveRequest(props.match.params.id);
    retrieveBook(currentRequest.book[0]);
    console.log("testffffddffffsddsssfffaaaf");
    console.log(currentRequest.state[0]);
  }, [props.match.params.id]);

  // const retrieveBook = async (id) => {
  //   await BookService.get(id).then((response) => {
  //     console.log(response.data);
  //     setCurrentBook(response.data);
  //   });
  // };

  const handleInputChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const renderCostButton = () => {};

  const retrieveRequest = async (id) => {
    await RequestService.getRequest(id).then((response) => {
      // console.log(response.data);
      setCurrentRequest(response.data);
      console.log(currentRequest.book[0]);
    });
  };

  const retrieveBook = async (id) => {
    await BookService.get(id).then((response) => {
      setCurrentBook(response.data);
      console.log(response.data);
    });
  };

  const updateBook = async () => {
    await BookService.update(currentBook._id, currentBook)
      .then((response) => {
        console.log(response.data);
        setMessage("The Request was updated");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateBookAfterInfo = async (request) => {
    await BookService.update(currentBook._id, currentBook)
      .then((response) => {
        console.log(response.data);
        setMessage("The Request was updated");
      })
      .catch((e) => {
        console.log(e);
      });
    request.state[0] = "620f227f5a6cfa6ef8038ece";
    await setCurrentRequest(request);
    await console.log(currentRequest);
    await RequestService.updateRequest(request._id, request).then(
      (response) => {
        console.log(response.data);
      }
    );
  };

  const updateState = async (request) => {
    console.log(request.state[0]);
    request.state[0] = "620f227f5a6cfa6ef8038ecd";
    await setCurrentRequest(request);
    await console.log(currentRequest);

    await RequestService.updateRequest(request._id, request).then(
      (response) => {
        console.log(response.data);
      }
    );
  };

  const costHandle = async (request, book) => {
    // book needs authorization
    if (cost > 50) {
      request.state[0] = "620f227f5a6cfa6ef8038ecf";
      await setCurrentRequest(request);
      await RequestService.updateRequest(request._id, request).then(
        (response) => {}
      );
    } else {
      request.state[0] = "620f227f5a6cfa6ef8038ed1";
      await setCurrentRequest(request);
      await RequestService.updateRequest(request._id, request).then(
        (response) => {}
      );
    }
  };

  const acceptRequest = async (request, book) => {
    request.state[0] = "620f227f5a6cfa6ef8038ed1";
    await setCurrentRequest(request);
    await RequestService.updateRequest(request._id, request).then(
      (response) => {}
    );
  };

  const rejectRequest = async (request, book) => {
    request.state[0] = "620f227f5a6cfa6ef8038ed0";
    await setCurrentRequest(request);
    await RequestService.updateRequest(request._id, request).then(
      (response) => {}
    );
  };

  const costHandleOnChange = (event) => {
    if (event.target.value > 50) {
      setCostMessage("Needs Authorization");
      setStyleCost("btn btn-danger");
    } else if (event.target.value <= 50) {
      setCostMessage("Purchase Book");
      setStyleCost("btn btn-success");
    }
    setCost(event.target.value);
    console.log(event.target.value);
  };

  const renderFormInput = (formItem) => {
    return (
      <div className="form-group">
        <label htmlFor={formItem}>Title</label>
        <input
          type="text"
          className="form-control"
          id={formItem}
          name={formItem}
          value={currentBook.title}
          onChange={handleInputChange}
        />
      </div>
    );
  };

  return (
    // <div>
    //   {/* <h1>Edit Request</h1> */}
    // </div>
    <div>
      {currentBook ? (
        <div className="edit-form">
          <h4>Request</h4>
          <p>{currentBook._id}</p>
          <form>
            {renderFormInput("title")}
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={currentBook.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBook.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={currentBook.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                className="form-control"
                id="year"
                name="year"
                value={currentBook.year}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <input
                type="text"
                className="form-control"
                id="language"
                name="language"
                value={currentBook.language}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isbn">Isbn</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                name="isbn"
                value={currentBook.isbn}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <input
                type="text"
                className="form-control"
                id="photo"
                name="photo"
                value={currentBook.photo}
                onChange={handleInputChange}
              />
            </div>
            {currentUser.roles[0] === "ROLE_MODERATOR" && (
              <div className="form-group">
                <label htmlFor="cost">Cost</label>
                <input
                  type="text"
                  className="form-control"
                  id="cost"
                  name="cost"
                  value={cost}
                  onChange={costHandleOnChange}
                  onClick={() => costHandle(currentRequest, currentBook)}
                />
                <Link
                  to={"/mod"}
                  type="button"
                  className={styleCost}
                  onClick={() => costHandle(currentRequest, currentBook)}
                >
                  {costMessage}
                </Link>
              </div>
            )}
          </form>
          {currentUser.roles[0] === "ROLE_USER" &&
            currentRequest.state[0] === "620f227f5a6cfa6ef8038ecb" && (
              <div>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={updateBook}
                >
                  Update
                </button>
                <p>{message}</p>
              </div>
            )}
          {currentUser.roles[0] === "ROLE_ADMIN" && (
            <div>
              <Link
                to={"/admin"}
                type="button"
                className="btn btn-success"
                onClick={() => acceptRequest(currentRequest)}
              >
                Accept
              </Link>
              <p>{message}</p>
            </div>
          )}
          {currentUser.roles[0] === "ROLE_ADMIN" && (
            <div>
              <Link
                to={"/admin"}
                type="button"
                className="btn btn-danger"
                onClick={() => rejectRequest(currentRequest)}
              >
                Reject
              </Link>
              <p>{message}</p>
            </div>
          )}
          {currentUser.roles[0] === "ROLE_USER" &&
            currentRequest.state[0] === "620f227f5a6cfa6ef8038ecd" && (
              <div>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={() => updateBookAfterInfo(currentRequest)}
                >
                  Update
                </button>
                <p>{message}</p>
              </div>
            )}
          {currentUser.roles[0] === "ROLE_MODERATOR" && (
            <div>
              {/* <label for="cost">Cost:</label>
              <input type="text" id="cost" name="cost"></input>
              <br />
              <br /> */}

              <button
                type="submit"
                className="btn btn-secondary"
                onClick={() => updateState(currentRequest)}
              >
                Need More Info
              </button>
              {/* <button
                type="submit"
                className="btn btn-danger"
                value={cost}
                onClick={costHandle}
                onChange={costHandleOnChange}
              >
                {costMessage}
              </button> */}

              <p>{message}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default EditRequest;
