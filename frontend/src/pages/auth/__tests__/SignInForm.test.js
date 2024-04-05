import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInForm from "../SignInForm";

// Test the Sign in form renders
test("renders Sign in form", async () => {
  render(
    <Router>
      <SignInForm />
    </Router>
  );

  // Wait for the element with placeholder text "Username" to appear
  await waitFor(() => {
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  });
});

// test for redirecting to home page if logged in
test("redirects to home page if already logged in", () => {
  // Mocking currentUser prop to simulate user already logged in
  const currentUser = { username: "testuser", email: "test@example.com" };
  render(
    <Router>
      <SignInForm currentUser={currentUser} />
    </Router>
  );

  // Ensure that user is redirected to the home page
  expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
});

// test username field changes value
test("username field changes", () => {
  render(
    <Router>
      <SignInForm />
    </Router>
  );

  // Find the username input field
  const usernameInput = screen.getByPlaceholderText("Username");

  // Simulate typing in the username field
  fireEvent.change(usernameInput, { target: { value: "testuser" } });

  // Assert that the value of the username field has been updated
  expect(usernameInput.value).toBe("testuser");
});
