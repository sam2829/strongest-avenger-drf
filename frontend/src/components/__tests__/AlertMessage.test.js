import React from "react";
import { render, fireEvent, act } from "@testing-library/react"; // Import act
import { BrowserRouter as Router } from "react-router-dom";
import AlertMessage from "../AlertMessage";

// test that Alert message renders
test("renders AlertMessage component", () => {
  render(
    <Router>
      <AlertMessage />
    </Router>
  );
});

test("closes AlertMessage component after specified duration", () => {
  jest.useFakeTimers();

  const { queryByText } = render(
    <Router>
      <AlertMessage showAlert={true} message="Test message" />
    </Router>
  );

  // Advance timers by 3 seconds
  act(() => {
    // Wrap state update in act
    jest.advanceTimersByTime(3000);
  });

  // Verify that the alert is no longer in the document
  expect(queryByText(/test message/i)).toBeNull();
});
