import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";
// Mock showAlert function
const showAlert = jest.fn();

// Test the navbar renders
test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

// test that the profile for logged in user is present when logged in
test("renders link to the user profile for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("Profile");
  expect(profileAvatar).toBeInTheDocument();
});

// test that the add a post for logged in user is present when logged in
test("renders link to the user Add a post for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const addPostLink = await screen.findByText("Add post");
  expect(addPostLink).toBeInTheDocument();
});

// test to show sign in and sign up render again when user signed out
test("renders Sign in and Sign up buttons again on log out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar showAlert={showAlert} />
      </CurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByRole("link", { name: "Sign out" });
  fireEvent.click(signOutLink);

  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  const signUpLink = await screen.findByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});

// test home navigation link navigates to correct page
test("home navigation link navigates to correct page", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  fireEvent.click(screen.getByText("Home"));

  expect(window.location.pathname).toBe("/");
});

// test sign in navigation link navigates to correct page
test("sign in navigation link navigates to correct page", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  fireEvent.click(screen.getByText("Sign in"));

  expect(window.location.pathname).toBe("/signin");
});

// test sign up navigation link navigates to correct page
test("sign up navigation link navigates to correct page", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  fireEvent.click(screen.getByText("Sign up"));

  expect(window.location.pathname).toBe("/signup");
});

// test feed navigation link navigates to correct page
test("feed navigation link navigates to correct page", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar showAlert={showAlert} />
      </CurrentUserProvider>
    </Router>
  );

  // Wait for the "Feed" link to be available
  const feedLink = await screen.findByText("Feed");

  // Click on the "Feed" link
  fireEvent.click(feedLink);

  // Wait for the location to change
  await waitFor(() => {
    expect(window.location.pathname).toBe("/feed");
  });
});

// test liked navigation link navigates to correct page
test("liked navigation link navigates to correct page", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar showAlert={showAlert} />
      </CurrentUserProvider>
    </Router>
  );

  // Wait for the "Feed" link to be available
  const likedLink = await screen.findByText("Liked");

  // Click on the "Feed" link
  fireEvent.click(likedLink);

  // Wait for the location to change
  await waitFor(() => {
    expect(window.location.pathname).toBe("/liked");
  });
});

// test liked navigation link navigates to correct page
test("profile navigation link navigates to correct page", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar showAlert={showAlert} />
      </CurrentUserProvider>
    </Router>
  );

  // Wait for the "Feed" link to be available
  const profileLink = await screen.findByText("Profile");

  // Click on the "Feed" link
  fireEvent.click(profileLink);

  // Wait for the location to change
  await waitFor(() => {
    expect(window.location.pathname).toBe("/profiles/1");
  });
});
