import React, { Component } from "react";

export default class BookTableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.author}</td>
        <td>{this.props.obj.description}</td>
        <td>{this.props.obj.category}</td>
        <td>{this.props.obj.year}</td>
        <td>{this.props.obj.language}</td>
        <td>{this.props.obj.isbn}</td>
        <td></td>
      </tr>
    );
  }
}
