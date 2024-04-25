import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Report from "../Report";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the report renders
test("renders create report form fields", async () => {

  // Mock data for the report
  const report = {
    id: 1,
    owner: 'sam',
    post: 'test post',
    created_at: '2024-04-24',
    reason: 'spam',
    description: 'Example description',
    resolved: false,
  };

  // Mock showAlert and setReports functions
  const showAlert = jest.fn();
  const setReports = jest.fn();

  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <Report
            report={report}
            showAlert={showAlert}
            setReports={setReports}
          />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the elements for the text fields
  await waitFor(() => {
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText(`Report ${report.id}`)).toBeInTheDocument();
    expect(screen.getByText(report.owner)).toBeInTheDocument();
    expect(screen.getByText(report.post)).toBeInTheDocument();
    expect(screen.getByText(report.created_at)).toBeInTheDocument();
    expect(screen.getByText(report.description)).toBeInTheDocument();
  });
});