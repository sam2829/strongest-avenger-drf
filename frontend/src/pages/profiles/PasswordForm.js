import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import styles from "../../styles/PasswordForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import logo from "../../assets/logo.png";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const PasswordForm = ({ showAlert }) => {
  // Use state hook for password
  const [passwordData, setPasswordData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = passwordData;
  // Use state hook for errors
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  // Get the current user
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  // handle changes in input fields
  const handleChange = (event) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    });
  };

  // handle submit of form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", passwordData);
      showAlert("success", `You have successfully changed your password.`);
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className={appStyles.Content}>
      {/* heading section with logo and heading */}
      <Row className={`${styles.Row} justify-content-center`}>
        <Col md={{ span: 6 }}>
          <Container>
            <Row className="text-center">
              <Col xs="2">
                <img src={logo} alt="logo" height="40" />
              </Col>
              <Col xs="8">
                <h1 className={styles.Heading}>Change password</h1>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="justify-content-center text-center my-3">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            {/* Change password input field */}
            <Form.Group>
              <Form.Label className="d-none">Change password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                className={styles.PasswordInput}
                name="new_password1"
              />
            </Form.Group>
            {/* Displaying change password errors, if any */}
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            {/* Confirm password input field */}
            <Form.Group>
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                className={styles.PasswordInput}
                name="new_password2"
              />
            </Form.Group>
            {/* Displaying confirm password errors, if any */}
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            {/* save and cancel buttons */}
            <Button
              className={`${btnStyles.Button} ${styles.PasswordButton}`}
              type="submit"
            >
              save
            </Button>
            <Button
              className={`${btnStyles.Button} ${styles.PasswordButton}`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordForm;
