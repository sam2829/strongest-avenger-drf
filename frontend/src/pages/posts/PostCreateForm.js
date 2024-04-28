import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

import PostCreateFormTextFields from "./PostCreateFormTextFields";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/UseRedirect";
import PostCreateFormImageField from "./PostCreateFormImageField";
import PostCreateFormVideoField from "./PostCreateFormVideoField";
import PostCreateFormRadioButtons from "./PostCreateFormRadioButtons";
import Asset from "../../components/Asset";

// PostCreateForm component for creating a new post
const PostCreateForm = ({ showAlert }) => {
  // handle errors on the post form
  const [errors, setErrors] = useState({});
  // Redirect hook to redirect users is logged out
  useRedirect("loggedOut");

  // The post data
  const [postData, setPostData] = useState({
    title: "",
    characterName: "",
    characterCategory: "Avenger",
    content: "",
    image: "",
    video: "",
    mediaType: "Image",
  });
  const {
    title,
    characterName,
    characterCategory,
    content,
    image,
    video,
    mediaType,
  } = postData;

  // References for image and video inputs
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const history = useHistory();

  // User knows when form is being submitted
  const [submittingForm, setSubmittingForm] = useState(false);

  // Handle form fields changing
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Clear the other media type when switching between image and video
    if (name === "mediaType") {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value,
        // Clear image if switching to video
        image: value === "Video" ? "" : image,
        // Clear video if switching to image
        video: value === "Image" ? "" : video,
      });
    } else {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value,
      });
    }
  };

  // Handle create post submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    setSubmittingForm(true);

    formData.append("title", title);
    formData.append("character_name", characterName);
    formData.append("character_category", characterCategory);
    formData.append("content", content);

    // Check if mediaType is Image or Video and append the corresponding file
    if (mediaType === "Image") {
      formData.append("image", imageInput.current.files[0]);
    } else if (mediaType === "Video") {
      formData.append("video", videoInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      showAlert("success", `You have successfully created a post`);
      setSubmittingForm(false);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      if (err.response && err.response.data) {
        // Display the error message received from the server
        // console.log("Server Error:", err.response.data);
        showAlert("danger", `There was an error with creating your post.`);
        setErrors(err.response.data);
        setSubmittingForm(false);
      } else {
        // console.log("Network Error:", err.message);
        showAlert("success", `Something went wrong. Please try again, also make sure video is under 60 seconds.`);
        setSubmittingForm(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={appStyles.Content}>
        <Row className="p-4 justify content center">
          <Col md={{ span: 10, offset: 1 }}>
            <Container className="d-flex flex-column justify-content-center">
              <Form.Group className="text-center">
                {/* Rendered if image upload is selected */}
                {postData.mediaType === "Image" && (
                  <PostCreateFormImageField
                    image={image}
                    errors={errors}
                    imageInput={imageInput}
                    postData={postData}
                    setPostData={setPostData}
                  />
                )}
                {/* Rendered if video upload is selected */}
                {postData.mediaType === "Video" && (
                  <PostCreateFormVideoField
                    video={video}
                    errors={errors}
                    videoInput={videoInput}
                    postData={postData}
                    setPostData={setPostData}
                  />
                )}
                {/* Component for radio buttons image or video */}
                <PostCreateFormRadioButtons
                  mediaType={mediaType}
                  handleChange={handleChange}
                />
              </Form.Group>
            </Container>

            <Container className={styles.FormFields}>
              {/* Component to render the text fields in form */}
              <PostCreateFormTextFields
                title={title}
                characterName={characterName}
                characterCategory={characterCategory}
                content={content}
                handleChange={handleChange}
                errors={errors}
              />
              {/* Buttons to display on form when form isnt being submitted */}
              {!submittingForm && (
                <>
                  <Button
                    className={`${btnStyles.Button} ${styles.PostButton}`}
                    type="submit"
                  >
                    post
                  </Button>
                  <Button
                    className={`${btnStyles.Button} ${styles.PostButton}`}
                    onClick={() => history.goBack()}
                  >
                    cancel
                  </Button>
                </>
              )}
              {/* spinner displayed instead of buttons when for submitting */}
              {submittingForm && (
                <Asset spinner />
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default PostCreateForm;
