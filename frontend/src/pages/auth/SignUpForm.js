import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignUpInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useState } from "react";
import { useRedirect } from "../../hooks/UseRedirect";

// SignUpForm component for user sign up
const SignUpForm = () => {
  // Use state hook for Signup data
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  // Use state hook for errors
  const [errors, setErrors] = useState({});

  const history = useHistory();
  // Redirect hook to redirect users is logged in
  useRedirect("loggedIn");

  // Function so input fields display whats being typed
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to submit sign up form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      console.error("Error submitting form:", err);
      setErrors(err.response?.data);
    }
  };

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
                <h1 className={styles.Heading}>Sign up</h1>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="justify-content-center text-center p-4">
        <Col md={{ span: 6 }}>
          <Container>
            <Form onSubmit={handleSubmit}>
              {/* Username input field */}
              <Form.Group controlId="username">
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
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
              <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Displaying password1 errors, if any */}
              {errors.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              {/* Confirm password input field */}
              <Form.Group controlId="password2">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Displaying password2 errors, if any */}
              {errors.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              {/* Sign up button */}
              <Button className={btnStyles.Button} type="submit">
                Sign up
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
        </Col>
      </Row>
      {/* Link to sign in page */}
      <Row className="justify-content-center text-center p-2">
        <Col md={{ span: 6 }}>
          <Container>
            <Link className={styles.Link} to="/signin">
              Already have an account? Please <span>Sign in</span>
            </Link>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
