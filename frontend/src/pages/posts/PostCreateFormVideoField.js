import React from "react";
import Form from "react-bootstrap/Form";
import styles from "../../styles/PostCreateEditForm.module.css";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import Alert from "react-bootstrap/Alert";
import btnStyles from "../../styles/Button.module.css";

// Component for rendering video field in create post form
const PostCreateFormVideoField = ({
  video,
  postData,
  setPostData,
  errors,
  videoInput,
}) => {
  // Handle change in video field
  const handleChangeVideo = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(video);
      setPostData({
        ...postData,
        video: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
    <>
      {/* Render video player if video is available */}
      {video ? (
        <>
          <figure>
            <div className={styles.VideoContainer}>
              <video src={video} className={styles.Media} controls>
                Your browser does not support the video tag.
              </video>
              {/* Play button */}
              <div
                className={styles.PlayButton}
                onClick={() => document.getElementById("video").play()}
              ></div>
            </div>
          </figure>
          <div>
            {/* Button to change the video */}
            <Form.Label className={btnStyles.Button} htmlFor="video-upload">
              Change the video
            </Form.Label>
          </div>
        </>
      ) : (
        // Render upload option if video is not available
        <Form.Label
          className="d-flex justify-content-center"
          htmlFor="video-upload"
        >
          <Asset src={Upload} message="Click or tap to upload a video" />
        </Form.Label>
      )}
      <Form.File
        id="video-upload"
        className={styles.ChooseFile}
        accept="video/*"
        onChange={handleChangeVideo}
        ref={videoInput}
      />
      {/* Display error messages for the video field, if any */}
      {errors?.video?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );
};

export default PostCreateFormVideoField;
