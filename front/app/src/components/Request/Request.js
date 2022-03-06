import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import RequestService from "../../services/request.service";

const currentUser = RequestService.getCurrentUser();
const currentRequest = RequestService.getCreatedRequest();
const oldRequest = RequestService.getCreatedRequest();
const currentBook = RequestService.getCreatedBook();

const Request = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [isbn, setIsbn] = useState("");
  const [photo, setPhoto] = useState("");
  const [approved, setApproved] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [issuer, setIssuer] = useState([currentUser.id]);
  const [book, setBook] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [authorizer, setAuthorizer] = useState([]);
  const [request, setRequest] = useState("");
  const [userArray, setUserArray] = useState(currentUser.requests);
  const [state, setState] = useState(["620f227f5a6cfa6ef8038ecb"]);
  const [reactState, setReactState] = useState(false);

  useEffect(() => {
    // console.log(book);
    // console.log(issuer);
    if (book.length > 0) {
      console.log(book);
      RequestService.createRequest(
        issuer,
        book,
        employee,
        authorizer,
        state
      ).then((response) => {
        // setRequest(RequestService.getCreatedRequest._id);
      });
      // console.log("first test");
      // RequestService.findAllRequestsByIssuer();
      // console.log("second test");
    }
  }, [book, request]);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeAuthor = (e) => {
    const author = e.target.value;
    setAuthor(author);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  const onChangeYear = (e) => {
    const year = e.target.value;
    setYear(year);
  };

  const onChangeLanguage = (e) => {
    const language = e.target.value;
    setLanguage(language);
  };

  const onChangeIsbn = (e) => {
    const isbn = e.target.value;
    setIsbn(isbn);
  };

  const onChangePhoto = (e) => {
    const photo = e.target.value;
    setPhoto(photo);
  };

  const handleArrState = (arr, state, setState) => {
    const newArr = [...state];
    newArr.push(arr);
    setState(newArr);
  };

  const handleRequest = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      RequestService.createBook(
        title,
        author,
        description,
        category,
        year,
        language,
        isbn,
        photo,
        approved
      ).then(
        (response) => {
          setBook([RequestService.getCreatedBook()._id]);
          setMessage("Request has been created");
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleRequest} ref={form}>
          {!successful && (
            <div>
              <div>
                <h3>Book Request</h3>
              </div>
              <div className="form-group">
                <label htmlFor="title">Book Title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Author</label>
                <Input
                  type="text"
                  className="form-control"
                  name="author"
                  value={author}
                  onChange={onChangeAuthor}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Input
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Category</label>
                <Input
                  type="text"
                  className="form-control"
                  name="category"
                  value={category}
                  onChange={onChangeCategory}
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Year</label>
                <Input
                  type="text"
                  className="form-control"
                  name="year"
                  value={year}
                  onChange={onChangeYear}
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Language</label>
                <Input
                  type="text"
                  className="form-control"
                  name="language"
                  value={language}
                  onChange={onChangeLanguage}
                />
              </div>

              <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <Input
                  type="text"
                  className="form-control"
                  name="isbn"
                  value={isbn}
                  onChange={onChangeIsbn}
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Photo Link</label>
                <Input
                  type="text"
                  className="form-control"
                  name="photo"
                  value={photo}
                  onChange={onChangePhoto}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Request;
