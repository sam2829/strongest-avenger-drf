import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CommentRender from "../CommentRender";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Mock comments data
const comments = {
  results: [
    { id: 1, content: "First comment" },
    { id: 2, content: "Second comment" },
  ],
};



// Test the comment render renders
test("renders comment render", async () => {
    render(
      <Router>
        <CommentRender comments={comments} />
      </Router>
    );

  // Wait for the element with placeholder text "post" to appear
  await waitFor(() => {
    expect(screen.getByText("First comment")).toBeInTheDocument();
  });
});

// test correct message displays if no comments and logged out
test("renders message for no comments and logged out", async () => {
  render(
    <Router>
      <CommentRender comments={{ results: [] }} />
    </Router>
  );

  // Wait for the element with the specific text to appear
  await waitFor(() => {
    expect(screen.getByText("No comments... yet")).toBeInTheDocument();
  });
});

