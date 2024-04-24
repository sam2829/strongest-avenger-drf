import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CommentAgree from "../CommentAgree";

// test to see if agree comment renders
test("renders agree comment correctly", () => {
  render(
    <Router>
      <CommentAgree agree={true} />
    </Router>
  );
    
  // Check if the agree comment content icon is rendered
  const agreeIcon = screen.getByTestId('agree-icon');
  expect(agreeIcon).toBeInTheDocument();
});

// test to see if disagree comment icon renders
test("renders disagree comment correctly", () => {
  render(
    <Router>
      <CommentAgree agree={false} />
    </Router>
  );
    
  // Check if the agree comment content is rendered
  const disagreeIcon = screen.getByTestId('disagree-icon');
  expect(disagreeIcon).toBeInTheDocument();
});