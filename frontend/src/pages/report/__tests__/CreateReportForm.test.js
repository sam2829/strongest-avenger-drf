import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateReportForm from "../CreateReportForm";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the create report form renders
test("renders create report form", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <CreateReportForm />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the element with text "Report" to appear
  await waitFor(() => {
    expect(screen.getByText("Report")).toBeInTheDocument();
  });
});
