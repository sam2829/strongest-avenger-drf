import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CurrentUserProvider } from "../CurrentUserContext";

test("renders children with default context", async () => {
  // Wrap the render function in act() to handle state updates
  act(() => {
    render(
      <CurrentUserProvider>
        <div>Child Component</div>
      </CurrentUserProvider>
    );
  });

  // Wait for the asynchronous action to complete
  const childComponent = await screen.findByText("Child Component");

  // Assert that the child component is rendered

  expect(childComponent).toBeInTheDocument();
});
