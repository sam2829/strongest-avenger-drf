import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostCreateFormRadioButtons from "../PostCreateFormRadioButtons";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the post create form radio button fields renders
test("renders post create form radio buttons fields", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostCreateFormRadioButtons />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the elements for the radio buttons field
  await waitFor(() => {
    expect(screen.getByText("Image")).toBeInTheDocument();
    expect(screen.getByText("Video")).toBeInTheDocument();
  });
});

// Test correct radio button based on media type image
test("correct radio button based on media type image", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostCreateFormRadioButtons mediaType="Image" />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the elements for the radio buttons field
  await waitFor(() => {
    expect(screen.getByLabelText("Image")).toBeChecked();
    expect(screen.getByLabelText("Video")).not.toBeChecked();
  });
});

// Test correct radio button based on media type video
test("correct radio button based on media type video", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostCreateFormRadioButtons mediaType="Video" />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the elements for the radio buttons field
  await waitFor(() => {
    expect(screen.getByLabelText("Video")).toBeChecked();
    expect(screen.getByLabelText("Image")).not.toBeChecked();
  });
});