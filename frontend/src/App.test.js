import { render, screen } from "@testing-library/react";
import App from "./App";

test("Login button present", () => {
  render(<App />);
  const loginButton = screen.getByText(/Log In/i);
  expect(loginButton).toBeInTheDocument();
});
