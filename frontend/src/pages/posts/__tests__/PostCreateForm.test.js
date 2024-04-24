import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostCreateForm from "../PostCreateForm";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the post create form renders
test("renders post create form", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostCreateForm />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the element with placeholder text "post" to appear
  await waitFor(() => {
    expect(screen.getByText("post")).toBeInTheDocument();
  });
});
