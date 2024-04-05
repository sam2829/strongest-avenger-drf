import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";

import CommentAgree from "./CommentAgree";

const CommentEditForm = ({
  id,
  content,
  setComments,
  setShowEditForm,
  agreeProp,
}) => {
  // State of the form content, agree and errors
  const [formContent, setFormContent] = useState(content);
  const [agree, setAgree] = useState(agreeProp);
  const [errors, setErrors] = useState({});

  // funtion to handle change in the form field
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Function to handle submit of the edit form change
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
        agree: agree,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
                agree: agree,
              }
            : comment;
        }),
      }));
      setErrors({});
      setShowEditForm(false);
    } catch (err) {
      setErrors(err.response.data);
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Input field for entering comment content */}
          <Form.Control
            className={`${styles.textarea} ${styles.Form} ${styles.EditContent}`}
            placeholder="my comment..."
            as="textarea"
            value={formContent}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
        {/* Display error messages, if any */}
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        {/* Display agree icon */}
        <div className="d-flex justify-content-center mt-2">
          <CommentAgree agree={agree} setAgree={setAgree} />
          <button className={`${btnStyles.Button} ml-2`} type="submit">
            save
          </button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default CommentEditForm;
