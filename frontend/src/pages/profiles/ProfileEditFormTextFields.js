import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/ProfileEditForm.module.css";

// Component for rendering text fields in edit profile form
const EditFormTextFields = ({
  favouriteCharacter,
  content,
  handleChange,
  errors,
}) => {
  return (
    <>
      {/* Form group for the favourite character field */}
      <Form.Group>
        <Form.Label>Favourite character</Form.Label>
        <Form.Control
          type="text"
          name="favouriteCharacter"
          value={favouriteCharacter}
          onChange={handleChange}
          className={styles.EditInput}
        />
      </Form.Group>
      {/* Display error messages for the character name field, if any */}
      {errors?.favourite_character?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Form group for the content field */}
      <Form.Group>
        <Form.Label>About me</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={content}
          onChange={handleChange}
          className={styles.EditInput}
        />
      </Form.Group>
      {/* Display error messages for the content field, if any */}
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );
};

export default EditFormTextFields;
