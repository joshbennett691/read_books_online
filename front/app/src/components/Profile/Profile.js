import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import RequestService from "../../services/request.service";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  // const currentUser = AuthService.getCurrentUser();

  // const [requests, setRequests] = useState([]);
  // const [currentRequest, setCurrentRequest] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");

  // useEffect(() => {
  //   retrieveRequests();
  // }, []);

  // const onChangeSearchTitle = (e) => {
  //   const searchTitle = e.target.value;
  //   setSearchTitle(searchTitle);
  // };

  // const retrieveRequests = () => {
  //   RequestService.findAllRequestsByIssuer
  //     .getAll()
  //     .then((response) => {
  //       setRequests(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const refreshList = () => {
  //   retrieveRequests();
  //   setCurrentRequest(null);
  //   setCurrentIndex(-1);
  // };

  // const setActiveRequest = (request, index) => {
  //   setCurrentRequest(request);
  //   setCurrentIndex(index);
  // };

  return (
    <div>
      {/* <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
          <Link to="/request">
            <button>Create Request</button>
          </Link>
        </header>
      </div>
      <section className="FlexContainer">
        <div></div>
        <div>
          <h3>List of Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Category</th>
                <th>Year</th>
                <th>Language</th>
                <th>ISBN</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.length > 0 ? (
                this.state.books.map((book, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={book.photo} alt="Book Cover"></img>
                      </td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.description}</td>
                      <td>{book.category}</td>
                      <td>{book.year}</td>
                      <td>{book.language}</td>
                      <td>{book.isbn}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div>Web Chat</div>
      </section> */}
    </div>
  );
};

export default Profile;
