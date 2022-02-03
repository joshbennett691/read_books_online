import React, { Component } from "react";
import axios from "axios";

export default class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/books")
      .then((res) => {
        this.setState({
          books: res.data,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
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
    );
  }
}
