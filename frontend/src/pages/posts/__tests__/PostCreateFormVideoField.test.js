import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostCreateFormVideoField from "../PostCreateFormVideoField";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";


// Mock video file
const mockVideoFile = new File([""], "video.mp4", { type: "video/mp4" });

// Test the post create form video field renders
test("renders post create form video field", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostCreateFormVideoField />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the elements for the Video field
  await waitFor(() => {
    expect(screen.getByText("Click or tap to upload a video")).toBeInTheDocument();
  });
});

// Test the post Video renders when selected
test("renders Video when selected", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <PostCreateFormVideoField video={mockVideoFile} />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for video to load
  await waitFor(() => {
    // Check the text changes to change the video
    expect(screen.getByText("Change the video")).toBeInTheDocument();
  });
});