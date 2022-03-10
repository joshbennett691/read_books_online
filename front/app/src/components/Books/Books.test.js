import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Books from "./Books";

test("should render Books component", () => {
  render(<Books />);
  const registerElement = screen.getByTestId("form-render");
  expect(registerElement).toBeInTheDocument();
});

//will fail
test("should render Books component FAIL", () => {
  render(<Books />);
  const registerElement = screen.getByTestId("form-rendere");
  expect(registerElement).toBeInTheDocument();
});
