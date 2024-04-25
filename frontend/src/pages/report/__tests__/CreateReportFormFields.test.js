import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateReportFormFields from "../CreateReportFormFields";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";

// Test the create report form fields renders
test("renders create report form fields", async () => {
  await act(async () => {
    render(
      <Router>
        <CurrentUserProvider >
          <CreateReportFormFields />
        </CurrentUserProvider>
      </Router>
    );
  });

  // Wait for the elements for the text fields
  await waitFor(() => {
    expect(screen.getByText("Reason")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});

// test description field changes value
test("description field changes", () => {
  render(
    <Router>
      <CurrentUserProvider >
        <CreateReportFormFields />
      </CurrentUserProvider>
    </Router>
  );

  // Find the description input field
  const descriptionInput = screen.getByTestId("description");

  // Simulate typing in the description field
  fireEvent.change(descriptionInput, { target: { value: "testuser" } });

  // Assert that the value of the description field has been updated
  expect(descriptionInput.value).toBe("testuser");
});