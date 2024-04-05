import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

import CommentAgree from "./CommentAgree";

// CommentCreateForm component for creating a new comment
const CommentCreateForm = ({
  profile_id,
  profileImage,
  post,
  setPost,
  setComments,
}) => {
  // State variables for content, agreement, and errors
  const [content, setContent] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  // Function so content field displays whats being typed
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
        agree,
      });
      // Update comments state with the new comment
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // Update post state to increment comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      // Clear content and reset agreement and errors
      setContent("");
      setAgree(false);
      setErrors({});
    } catch (err) {
      setErrors(err.response.data);
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            {/* Avatar of the comment creator */}
            <Avatar src={profileImage} />
          </Link>
          {/* Input field for entering comment content */}
          <Form.Control
            className={`${styles.textarea} ${styles.Form} mb-3`}
            placeholder="my comment..."
            as="textarea"
            value={content}
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
            post
          </button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default CommentCreateForm;
