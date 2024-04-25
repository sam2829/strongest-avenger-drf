import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostLikeIcon from "../PostLikeIcon";


describe("PostLikeIcon Component", () => {
  const mockPost = {
  id: 1,
  is_owner: false,
  like_id: null,
  likes_count: 10,
  currentUser: "testUser",
  setPosts: jest.fn(),
  };
  // Test the post like icon renders
  test("renders post like icon", async () => {
    await act(async () => {
      render(
        <Router>
          <PostLikeIcon {...mockPost} />
        </Router>
      );
    });

    // Wait for the element with test 10 to appear
    await waitFor(() => {
      expect(screen.getByText(10)).toBeInTheDocument();
    });
  });
});