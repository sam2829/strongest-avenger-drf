import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ReportEditForm from "../ReportEditForm";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the report edit form renders
test("renders report edit form", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <ReportEditForm />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the element with text "report edit"
  await waitFor(() => {
    expect(screen.getByText("Report Edit")).toBeInTheDocument();
  });
});
