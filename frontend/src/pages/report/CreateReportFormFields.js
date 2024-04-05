import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/CreateReportForm.module.css";

const CreateReportFormFields = ({
  reason,
  description,
  handleChange,
  errors,
}) => {
  return (
    <>
      {/* Form group for the reasoning field */}
      <Form.Group>
        <Form.Label>Reason</Form.Label>
        <Form.Control
          as="select"
          name="reason"
          value={reason}
          onChange={handleChange}
          className={styles.ReportInput}
        >
          {/* Options for reasons */}
          <option value="spam">Spam</option>
          <option value="harassment">Harassment</option>
          <option value="inappropriate_content">Inappropriate Content</option>
          <option value="character_in_wrong_category">
            Character In Wrong Category
          </option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      {/* Display error messages for the reason field, if any */}
      {errors?.reason?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Form group for the description field */}
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={description}
          onChange={handleChange}
          className={styles.ReportInput}
        />
      </Form.Group>
      {/* Display error messages for the description field, if any */}
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );
};

export default CreateReportFormFields;
