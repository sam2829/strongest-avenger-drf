import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Comment from "../Comment";

describe("Comment Component", () => {
  const mockComment = {
    profile_id: "1",
    profile_image: "avatar.jpg",
    owner: "sam test",
    updated_at: "2024-04-23",
    content: "This is a test comment",
    id: "1",
    agree: true,
    setPost: jest.fn(),
    setComments: jest.fn(),
  };

  // test to see if comment renders
  test("renders comment correctly", () => {
    render(
      <Router>
        <Comment {...mockComment} />
      </Router>
    );
    
    // Check if the comment content is rendered
    expect(screen.getByText(mockComment.content)).toBeInTheDocument();
    
    // Check if the avatar, username, and date are rendered
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
    expect(screen.getByText(mockComment.owner)).toBeInTheDocument();
    expect(screen.getByText(mockComment.updated_at)).toBeInTheDocument();
    expect(screen.getByText(mockComment.content)).toBeInTheDocument();
  });
});