import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

import PostCreateFormTextFields from "./PostCreateFormTextFields";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import PostCreateFormImageField from "./PostCreateFormImageField";
import PostCreateFormVideoField from "./PostCreateFormVideoField";
import PostCreateFormRadioButtons from "./PostCreateFormRadioButtons";

// Component to render post edit form
const PostEditForm = ({ showAlert }) => {
  // handle errors on the post form
  const [errors, setErrors] = useState({});

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

  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  // on load retrieve existing post data
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const {
          title,
          character_name: characterName,
          character_category: characterCategory,
          content,
          image,
          video,
          is_owner,
        } = data;

        // Set media type to match what the post being retrieved
        if (is_owner) {
          const newMediaType = image ? "Image" : video ? "Video" : "Image";

          setPostData({
            title,
            characterName,
            characterCategory,
            content,
            image,
            video,
            mediaType: newMediaType,
          });
        } else {
          history.push("/");
        }
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

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

  // Handle edit post submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("character_name", characterName);
    formData.append("character_category", characterCategory);
    formData.append("content", content);

    // Check if mediaType is Image or Video and append the corresponding file
    if (mediaType === "Image") {
      if (imageInput?.current?.files[0]) {
        formData.append("image", imageInput.current.files[0]);
        formData.append("video", "");
      } else if (image) {
        // Use the existing image if no new image is selected
        const blob = await fetch(image).then((res) => res.blob());
        formData.append("image", blob, "existing_image.jpg");
      } else {
        showAlert("danger", "Please select an image file.");
        return;
      }
    } else if (mediaType === "Video") {
      if (videoInput?.current?.files[0]) {
        formData.append("video", videoInput.current.files[0]);
        formData.append("image", "");
      } else if (video) {
        // Use the existing video if no new video is selected
        const blob = await fetch(video).then((res) => res.blob());
        formData.append("video", blob, "existing_video.mp4");
      } else {
        showAlert("danger", "Please select a video file.");
        return;
      }
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      showAlert("success", `You have successfully changed your post`);
      history.push(`/posts/${id}`);
    } catch (err) {
      if (err.response && err.response.data) {
        // Display the error message received from the server
        // console.log("Server Error:", err.response.data);
        showAlert("danger", `There was an error with creating your post.`);
        setErrors(err.response.data);
      } else {
        // console.log("Network Error:", err.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    imageFile={image ? new File([image], image.name) : null}
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
                {/* Component to render radio buttons image or video */}
                <PostCreateFormRadioButtons
                  mediaType={mediaType}
                  handleChange={handleChange}
                />
              </Form.Group>
            </Container>

            <Container className={styles.FormFields}>
              {/* Component to render text fields */}
              <PostCreateFormTextFields
                title={title}
                characterName={characterName}
                characterCategory={characterCategory}
                content={content}
                handleChange={handleChange}
                errors={errors}
              />
              <Button
                className={`${btnStyles.Button} ${styles.PostButton}`}
                type="submit"
              >
                save
              </Button>
              <Button
                className={`${btnStyles.Button} ${styles.PostButton}`}
                onClick={() => history.goBack()}
              >
                cancel
              </Button>
            </Container>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default PostEditForm;
