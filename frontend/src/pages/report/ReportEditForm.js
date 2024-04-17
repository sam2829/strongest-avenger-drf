import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import logo from "../../assets/logo.png";

import styles from "../../styles/CreateEditReportForm.module.css";
import appStyles from "../../App.module.css";

import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/UseRedirect";
import CreateReportFormFields from "./CreateReportFormFields";

// Component to render the report edit form
const ReportEditForm = ({ showAlert }) => {
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

  // On load, retrieve existing report data
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch the report data from the server
        const { data } = await axiosReq.get(`/report/${id}/`);
        const { owner, resolved, reason, description } = data;

        // Check if the current user is the owner and the report is not resolved
        if (currentUser?.username === owner && !resolved) {
          setReportData({ owner, reason, description });
        } else {
          // Redirect the user if they are not the owner or the report is resolved
          history.push("/");
        }
      } catch (err) {
        // Redirect the user if an error occurs
        history.push("/");
      }
    };
    handleMount();
  }, [currentUser, history, id]);

  // Handle submit of report edit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("reason", reason);
    formData.append("description", description);
    try {
      // Send report data to the server
      await axiosReq.put(`/report/${id}/`, formData);
      showAlert("success", "Report edited successfully.");
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
                <h1 className={styles.Heading}>Report Edit</h1>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      {/* report edit form */}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="p-4 justify content center">
          <Col md={{ span: 10, offset: 1 }}>
            <Container className={styles.FormFields}>
              {/* report edit form fields */}
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

export default ReportEditForm;
