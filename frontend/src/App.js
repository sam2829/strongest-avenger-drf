import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import AlertMessage, { useAlert } from "./components/AlertMessage";
import React from "react";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import PasswordForm from "./pages/profiles/PasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import CreateReportForm from "./pages/report/CreateReportForm";
import { setTokenTimestamp } from "./utils/utils";
import NotFound from "./components/NotFound";

function App() {
  const { alert, showAlert, hideAlert } = useAlert();

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar showAlert={showAlert} />
      {alert && (
        <AlertMessage
          variant={alert.variant}
          message={alert.message}
          showAlert={showAlert}
          onClose={hideAlert}
        />
      )}
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Please adjust your search." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Please adjust your search or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Please adjust your search or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/signin"
            render={() => (
              <SignInForm
                showAlert={showAlert}
                currentUser={currentUser}
                setTokenTimestamp={setTokenTimestamp}
              />
            )}
          />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/posts/create"
            render={() => <PostCreateForm showAlert={showAlert} />}
          />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route
            exact
            path="/posts/:id/edit"
            render={() => <PostEditForm showAlert={showAlert} />}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm showAlert={showAlert} />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <PasswordForm showAlert={showAlert} />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm showAlert={showAlert} />}
          />
          <Route
            exact
            path="/report/:id/"
            render={() => <CreateReportForm showAlert={showAlert} />}
          />
          <Route
            exact
            path="/character_category/avenger/"
            render={() => (
              <PostsPage
                message="No results found. Please adjust your search or follow a user."
                filter={`character_category=Avenger&`}
              />
            )}
          />
          <Route
            exact
            path="/character_category/x-men/"
            render={() => (
              <PostsPage
                message="No results found. Please adjust your search or follow a user."
                filter={`character_category=X-Men&`}
              />
            )}
          />
          <Route
            exact
            path="/character_category/anti-hero/"
            render={() => (
              <PostsPage
                message="No results found. Please adjust your search or follow a user."
                filter={`character_category=Anti-Hero&`}
              />
            )}
          />
          <Route
            exact
            path="/character_category/villain/"
            render={() => (
              <PostsPage
                message="No results found. Please adjust your search or follow a user."
                filter={`character_category=Villain&`}
              />
            )}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
