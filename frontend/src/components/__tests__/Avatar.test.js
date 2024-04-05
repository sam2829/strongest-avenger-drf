import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Avatar from "../NavBar";

// Test the Avatar renders
test("renders Avatar", () => {
  render(
    <Router>
      <Avatar />
    </Router>
  );
});
