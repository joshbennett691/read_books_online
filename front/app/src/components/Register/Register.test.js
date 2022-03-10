import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Register from "./Register";

test("should render register component", () => {
  render(<Register />);
  const registerElement = screen.getByTestId("form-render");
  expect(registerElement).toBeInTheDocument();
});
