import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CommentCreateForm from "../CommentCreateForm";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the comment create form renders
test("renders comment create form", async () => {
  render(
    <Router>
      <CurrentUserProvider >
        <CommentCreateForm />
      </CurrentUserProvider>
    </Router>
  );

  // Wait for the element with placeholder text "post" to appear
  await waitFor(() => {
    expect(screen.getByPlaceholderText("my comment...")).toBeInTheDocument();
  });
});

// test comment field changes value
test("comment field changes", () => {
  render(
    <Router>
      <CurrentUserProvider >
        <CommentCreateForm />
      </CurrentUserProvider>
    </Router>
  );

  // Find the comment input field
  const commentInput = screen.getByPlaceholderText("my comment...");

  // Simulate typing in the comment field
  fireEvent.change(commentInput, { target: { value: "testuser" } });

  // Assert that the value of the username field has been updated
  expect(commentInput.value).toBe("testuser");
});