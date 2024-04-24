import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostCreateFormImageField from "../PostCreateFormImageField";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the post create form image field renders
test("renders post create form image field", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostCreateFormImageField />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the elements for the image field
  await waitFor(() => {
    expect(screen.getByText("Click or tap to upload an image")).toBeInTheDocument();
  });
});

// Test the post image renders when selected
test("renders image when selected", async () => {
  const imageUrl = "test-image-url";
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostCreateFormImageField image={imageUrl} />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for image to load
  await waitFor(() => {
    const uploadedImage = screen.getByRole("img", { src: imageUrl });
    expect(uploadedImage).toBeInTheDocument();
    // Check the text changes to change the image
    expect(screen.getByText("Change the image")).toBeInTheDocument();
  });
});