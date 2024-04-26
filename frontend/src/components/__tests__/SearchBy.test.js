import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBy from "../NavBar";

// Test the search by renders
test("renders SearchBy component", () => {
  render(
    <Router>
      <SearchBy />
    </Router>
  );

  const avengerLink = screen.getByText(/avenger/i);
  expect(avengerLink).toBeInTheDocument();
}); 

