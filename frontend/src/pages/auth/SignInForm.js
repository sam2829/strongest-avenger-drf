import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import styles from "../../styles/SignUpInForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import logo from "../../assets/logo.png";
import axios from "axios";
import { SetCurrentUserContext } from "../../contexts/CurrentUserContext";

// SignInForm component for user sign in
export class SignInForm extends Component {
  constructor(props) {
    super(props);

    // set the original states
    this.state = {
      signInData: {
        username: "",
        password: "",
      },
      errors: {},
    };
  }

  // Function so input fields display whats being typed
  handleChange = (event) => {
    const { signInData } = this.state;
    this.setState({
      signInData: {
        ...signInData,
        [event.target.name]: event.target.value,
      },
    });
  };

  // Function to submit sign in form
  handleSubmit = async (event) => {
    event.preventDefault();
    const { signInData } = this.state;
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      this.props.setCurrentUser(data.user);
      this.props.setTokenTimestamp(data);
      const { username } = signInData;
      this.props.showAlert(
        "success",
        `You have successfully signed in as ${username}!`
      );
      this.props.history.push("/");
    } catch (err) {
      this.setState({ errors: err.response?.data });
    }
  };

  render() {
    const { signInData, errors } = this.state;
    const { username, password } = signInData;
    const { currentUser } = this.props;

    // Check if currentUser exists
    if (currentUser) {
      // Redirect if user is logged in
      return <Redirect to="/" />;
    }
    return (
      <Container className={appStyles.Content}>
        <Row className={`${styles.Row} justify-content-center`}>
          <Col md={{ span: 6 }}>
            <Container>
              <Row className="text-center">
                <Col xs="2">
                  <img src={logo} alt="logo" height="40" />
                </Col>
                <Col xs="8">
                  <h1 className={styles.Heading}>Sign in</h1>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row className="justify-content-center text-center p-4">
          <Col md={{ span: 6 }}>
            <Container>
              <Form onSubmit={this.handleSubmit}>
                {/* Username input field */}
                <Form.Group controlId="username">
                  <Form.Label className="d-none">username</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    maxLength={12}
                  />
                </Form.Group>
                {/* Displaying username errors, if any */}
                {errors.username?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                {/* Password input field */}
                <Form.Group controlId="password">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    className={styles.Input}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                {/* Displaying password errors, if any */}
                {errors.password?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                {/* Sign in button */}
                <Button className={btnStyles.Button} type="submit">
                  Sign in
                </Button>
                {/* Displaying non-field errors, if any */}
                {errors.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                  </Alert>
                ))}
              </Form>
            </Container>
          </Col>
        </Row>
        {/* Link to sign up page */}
        <Row className="justify-content-center text-center p-2">
          <Col md={{ span: 6 }}>
            <Container>
              <Link className={styles.Link} to="/signup">
                Don't have an account? Please <span>Sign up!</span>
              </Link>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

// Using withRouter HOC to access router props and wrapping
// SignInForm with SetCurrentUserContext Consumer
export default withRouter((props) => (
  <SetCurrentUserContext.Consumer>
    {(setCurrentUser) => (
      <SignInForm {...props} setCurrentUser={setCurrentUser} />
    )}
  </SetCurrentUserContext.Consumer>
));
