import React from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import styles from "../../styles/Report.module.css"

const Report = (report) => {

  return (
    <Container className={appStyles.Content}>
      <Row className ='text-center my-4'>
        <Col lg={6}>
          <p className={styles.ReportInfo}>ID:</p>
          <p className={styles.ReportData}>{report.id}</p>
          <p className={styles.ReportInfo}>Owner:</p>
          <p className={styles.ReportData}>{report.owner}</p>
          <p className={styles.ReportInfo}>Post:</p>
          <p className={styles.ReportData}>{report.post}</p>
          <p className={styles.ReportInfo}>Created At:</p>
          <p className={styles.ReportData}>{report.created_at}</p>
        </Col>
        <Col lg={6}>
          <p className={styles.ReportInfo}>Reason:</p>
          <p className={styles.ReportData}>{report.reason}</p>
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