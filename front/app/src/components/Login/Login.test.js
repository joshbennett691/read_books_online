import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Login from "./Login";

test("should render register component", () => {
  render(<Login />);
  const registerElement = screen.getByTestId("form-render");
  expect(registerElement).toBeInTheDocument();
});

test("should render register component FAIL", () => {
  render(<Login />);
  const registerElement = screen.getByTestId("form-renderr");
  expect(registerElement).toBeInTheDocument();
});
