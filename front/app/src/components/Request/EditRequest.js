import React, { useState, useEffect } from "react";
import BookService from "../../services/book.service";
import axios from "axios";
import RequestService from "../../services/request.service";

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
  const [currentRequest, setCurrentRequest] = useState(initialRequestState);
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [message, setMessage] = useState("");

  //props.match.params.id IS THE REQUEST ID NOT BOOK

  //currentRequest.book[0] IS THE ACCESSOR FOR BOOK ID

  useEffect(() => {
    // retrieveBook(props.match.params.id);
    retrieveRequest(props.match.params.id);
    retrieveBook(currentRequest.book[0]);
    console.log("testffffddffffff");
  }, [props.match.params.id]);

  // const retrieveBook = async (id) => {
  //   await BookService.get(id).then((response) => {
  //     console.log(response.data);
  //     setCurrentBook(response.data);
  //   });
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

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
          </form>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={updateBook}
          >
            Update
          </button>
          <p>{message}</p>
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
