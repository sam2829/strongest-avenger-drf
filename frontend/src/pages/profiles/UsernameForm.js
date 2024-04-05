import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import styles from "../../styles/UsernameForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import logo from "../../assets/logo.png";
import { useHistory, useParams } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const UsernameForm = ({ showAlert }) => {
  // Use state hook for username
  const [username, setUsername] = useState("");
  // Use state hook for errors
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  // Get the current user and update current user
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    // Effect hook to set username when component mounts or id changes
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      // Redirect to homepage if current user's profile doesn't match id
      history.push("/");
    }
  }, [currentUser, history, id]);

  // handle submit of form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send updated username
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      // Update current user data
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      showAlert("success", `You have successfully changed your username`);
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
                <h1 className={styles.Heading}>Change username</h1>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="justify-content-center text-center my-3">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            {/* Username input field */}
            <Form.Group>
              <Form.Label className="d-none">Change Username</Form.Label>
              <Form.Control
                placeholder="new username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={styles.UsernameInput}
                maxLength={12}
              />
            </Form.Group>
            {/* Displaying username errors, if any */}
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            {/* save and cancel buttons */}
            <Button
              className={`${btnStyles.Button} ${styles.UsernameButton}`}
              type="submit"
            >
              save
            </Button>
            <Button
              className={`${btnStyles.Button} ${styles.UsernameButton}`}
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

export default UsernameForm;
