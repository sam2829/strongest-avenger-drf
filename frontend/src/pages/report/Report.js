import React from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import styles from "../../styles/Report.module.css"
import logo from "../../assets/logo.png";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

// Report function to display the report and function
const Report = ({
    report,
    showAlert,
    setReports
  }) => {

  // Get currrent user
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === report.owner;
  const history = useHistory();

  // Function to change the reason displays from the api
  const reasonDisplay = (reason) => {
    switch (reason) {
      case "spam":
        return "Spam";
      case "harassment":
        return "Harassment";
      case "inappropriate_content":
        return "Inappropriate Content";
      case "character_in_wrong_category":
        return "Character In Wrong Category";
      default:
        return reason;
    }
  };

  // Function to send to edit report page
  const handleEdit = () => {
    history.push(`/report/${report.id}/edit`);
  };

  // function to delete report
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/report/${report.id}/`);
      // update the reports
      setReports((prevReports) => ({
        ...prevReports,
        results: prevReports.results.filter((rep) => rep.id !== report.id)
      }));
      showAlert("success", "Report deleted successfully.");
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Container className={appStyles.Content}>
      {/* Report heading and logo */}
      <Row className={`${styles.Row} justify-content-center`}>
          <Col md={{ span: 6 }}>
            <Container>
              <Row className="text-center">
                <Col xs="2">
                  <img src={logo} alt="logo" height="40" />
                </Col>
                <Col xs="8">
                  <h1 className={styles.Heading}>Report {report.id}</h1>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      {/* Drop down menu only displayed if owner */}
      <div className="ml-auto mt-2 d-flex align-items-center">
        {isOwner && (
          <div className="ml-auto">
            <MoreDropdown
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              resolved={report.resolved}
            />
          </div>
        )}
      </div>
      {/* Report data */}
      <Row className ='text-center'>
        <Col lg={6}>
          <p className={styles.ReportInfo}>Owner:</p>
          <p className={styles.ReportData}>{report.owner}</p>
          <p className={styles.ReportInfo}>Post:</p>
          <p className={styles.ReportData}>{report.post}</p>
          <p className={styles.ReportInfo}>Created At:</p>
          <p className={styles.ReportData}>{report.created_at}</p>
        </Col>
        <Col lg={6}>
          <p className={styles.ReportInfo}>Reason:</p>
          <p className={styles.ReportData}>{reasonDisplay(report.reason)}</p>
          <p className={styles.ReportInfo}>Description:</p>
          <p className={styles.ReportData}>{report.description}</p>
          {report.resolved ? (
            <p className={styles.ReportInfo}>Resolved: <i className={`${styles.Tick} fa-solid fa-circle-check`}></i></p>
          ) : (
            <p className={styles.ReportInfo}>Resolved: <i className={`${styles.Cross} fa-solid fa-circle-xmark`}></i></p>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Report