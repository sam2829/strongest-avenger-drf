import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "../SignUpForm";

// Test the Sign up form renders
test("renders Sign in form", async () => {
  render(
    <Router>
      <SignUpForm />
    </Router>
  );

  // Wait for the element with placeholder text "Username" to appear
  await waitFor(() => {
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  });
});

// test username field changes value
test("username field changes", () => {
  render(
    <Router>
      <SignUpForm />
    </Router>
  );

  // Find the username input field
  const usernameInput = screen.getByPlaceholderText("Username");

  // Simulate typing in the username field
  fireEvent.change(usernameInput, { target: { value: "testuser" } });

  // Assert that the value of the username field has been updated
  expect(usernameInput.value).toBe("testuser");
});
