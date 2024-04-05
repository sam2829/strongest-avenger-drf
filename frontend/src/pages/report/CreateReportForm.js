import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import logo from "../../assets/logo.png";

import styles from "../../styles/CreateReportForm.module.css";
import appStyles from "../../App.module.css";

import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/UseRedirect";
import CreateReportFormFields from "./CreateReportFormFields";

// Component to render the report form
const CreateReportForm = ({ showAlert }) => {
  // Redirect hook to redirect users is logged out
  useRedirect("loggedOut");
  // handle errors on the post form
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();
  // Hook to get current user
  const currentUser = useCurrentUser();

  const [reportData, setReportData] = useState({
    owner: currentUser ? currentUser.username : "",
    post: id,
    reason: "spam",
    description: "",
  });
  const { reason, description } = reportData;

  // Function so content field displays whats being typed
  const handleChange = (event) => {
    setReportData({
      ...reportData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle submit of create report form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send report data to the server
      await axiosReq.post("/report/", reportData);
      showAlert("success", "Report submitted successfully.");
      history.goBack();
    } catch (err) {
      // console.log("Server Error:", err.response.data);
      setErrors(err.response.data);
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
                <h1 className={styles.Heading}>Report</h1>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      {/*  create report form */}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="p-4 justify content center">
          <Col md={{ span: 10, offset: 1 }}>
            <Container className={styles.FormFields}>
              {/* Create report form fields */}
              <CreateReportFormFields
                reason={reason}
                description={description}
                handleChange={handleChange}
                errors={errors}
              />
              {/* Buttons to save or cancel profile edit */}
              <Button
                className={`${btnStyles.Button} ${styles.ReportButton}`}
                type="submit"
              >
                save
              </Button>
              <Button
                className={`${btnStyles.Button} ${styles.ReportButton}`}
                onClick={() => history.goBack()}
              >
                cancel
              </Button>
            </Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateReportForm;
