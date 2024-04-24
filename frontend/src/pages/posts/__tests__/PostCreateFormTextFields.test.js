import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostCreateFormTextFields from "../PostCreateFormTextFields";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the post create form text fields renders
test("renders post create form text fields", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostCreateFormTextFields />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the elements for the text fields
  await waitFor(() => {
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Character name")).toBeInTheDocument();
    expect(screen.getByText("Character category")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
