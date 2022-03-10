import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Request from "./Request";
import EditRequest from "./EditRequest";

test("should render Request component", () => {
  render(<Request />);
  const registerElement = screen.getByTestId("form-render");
  expect(registerElement).toBeInTheDocument();
});

//WILL FAIL
test("should render Request component FAIL", () => {
  render(<Request />);
  const registerElement = screen.getByTestId("form-renderr");
  expect(registerElement).toBeInTheDocument();
});

test("should render Edit Request component", () => {
  render(<EditRequest />);
  const registerElement = screen.getByTestId("form-render");
  expect(registerElement).toBeInTheDocument();
});

//FAIL
test("should render Edit Request component FAIL", () => {
  render(<EditRequest />);
  const registerElement = screen.getByTestId("form-render4");
  expect(registerElement).toBeInTheDocument();
});
