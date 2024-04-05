import React from "react";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import styles from "../../styles/ProfileEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// Component to ender image field in edit profile form
const ProfileEditFormImageField = ({
  image,
  errors,
  imageInput,
  profileData,
  setProfileData,
}) => {
  return (
    <div>
      {/* Displaying the image */}
      <figure>
        <Image className={styles.Media} src={image} fluid />
      </figure>
      {/* Displaying error messages if any */}
      {errors?.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <div>
        {/* Button to change profile image */}
        <Form.Label
          className={`${btnStyles.Button} my-4`}
          htmlFor="image-upload"
        >
          Change the image
        </Form.Label>
      </div>
      {/* File input for uploading image */}
      <Form.File
        id="image-upload"
        className={styles.ChooseFile}
        ref={imageInput}
        accept="image/*"
        onChange={(e) => {
          if (e.target.files.length) {
            setProfileData({
              ...profileData,
              image: URL.createObjectURL(e.target.files[0]),
            });
          }
        }}
      />
    </div>
  );
};

export default ProfileEditFormImageField;
