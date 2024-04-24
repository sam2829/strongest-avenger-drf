import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CommentEditForm from "../CommentEditForm";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the comment edit form renders
test("renders comment edit form", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <CommentEditForm />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the element with placeholder text "my comment..." to appear
  await waitFor(() => {
    expect(screen.getByPlaceholderText("my comment...")).toBeInTheDocument();
  });
});

// test comment field changes value
test("comment field changes", () => {
  render(
    <Router>
      <CurrentUserProvider >
        <CommentEditForm />
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