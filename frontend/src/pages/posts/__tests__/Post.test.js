import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Post from "../Post";

describe("Post Component", () => {
  const mockPost = {
    profile_id: "1",
    profile_image: "avatar.jpg",
    owner: "sam test",
    updated_at: "2024-04-23",
    content: "This is a test post",
    id: "1",
    title: "Test title",
    image: "testpost.jpg",
  };

  // test to see if post render
  test("renders post correctly", () => {
    render(
      <Router>
        <Post {...mockPost} />
      </Router>
    );

    // Check if the post information is rendered
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
    expect(screen.getByText(mockPost.owner)).toBeInTheDocument();
    expect(screen.getByText(mockPost.updated_at)).toBeInTheDocument();
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  })
});
