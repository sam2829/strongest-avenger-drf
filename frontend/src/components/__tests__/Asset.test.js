import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Asset from "../Asset";
import { Spinner } from "react-bootstrap";

// Test the Asset renders
test("renders Asset", () => {
  render(
    <Router>
      <Asset />
    </Router>
  );
});

// Test that spinner is rendered when spinner prop is true
test("renders spinner when spinner prop is true", () => {
  const { container } = render(
    <Router>
      <Asset spinner={true} />
    </Router>
  );
  const spinnerElement = container.querySelector(".spinner-border");
  expect(spinnerElement).toBeInTheDocument();
});

// Test that image is rendered when src prop is provided
test("renders image when src prop is provided", () => {
  const src = "example.jpg";
  const { container } = render(
    <Router>
      <Asset src={src} />
    </Router>
  );
  const imageElement = container.querySelector(`img[src="${src}"]`);
  expect(imageElement).toBeInTheDocument();
});

// Test that paragraph message is rendered
test("renders paragraph message when message prop is provided", () => {
  const message = "Test message";
  const { getByText } = render(
    <Router>
      <Asset message={message} />
    </Router>
  );
  const messageElement = getByText(message);
  expect(messageElement).toBeInTheDocument();
});
