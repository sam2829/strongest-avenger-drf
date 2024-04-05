import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBy from "../NavBar";

// Test the navbar renders
test("renders NavBar", () => {
  render(
    <Router>
      <SearchBy />
    </Router>
  );
});
