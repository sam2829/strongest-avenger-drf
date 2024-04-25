import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostEditForm from "../PostEditForm";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the post edit form renders
test("renders post edit form", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostEditForm />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the element with placeholder text "post" to appear
  await waitFor(() => {
    expect(screen.getByText("save")).toBeInTheDocument();
  });
});
