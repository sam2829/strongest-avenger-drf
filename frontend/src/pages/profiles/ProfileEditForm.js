import React, { useRef, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/ProfileEditForm.module.css";
import appStyles from "../../App.module.css";

import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import EditFormTextFields from "./ProfileEditFormTextFields";
import ProfileEditFormImageField from "./ProfileEditFormImageField";

const ProfileEditForm = ({ showAlert }) => {
  // handle errors on the post form
  const [errors, setErrors] = useState({});
  // References for image input
  const imageInput = useRef();
  const history = useHistory();
  const { id } = useParams();
  // Hook to get current user and set current user
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // The profile data
  const [profileData, setProfileData] = useState({
    name: "",
    favouriteCharacter: "",
    content: "",
    image: "",
  });
  const { name, favouriteCharacter, content, image } = profileData;

  // on load retrieve existing post data
  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const {
            name,
            favourite_character: favouriteCharacter,
            content,
            image,
          } = data;
          setProfileData({ name, favouriteCharacter, content, image });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };
    handleMount();
  }, [currentUser, history, id]);

  // handle change
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle create post submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("favourite_character", favouriteCharacter || "");
    formData.append("content", content);
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      showAlert("success", `You have successfully updated your profile`);
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Container className={appStyles.Content}>
        <Row className="p-4 justify content center">
          <Col md={{ span: 10, offset: 1 }}>
            <Container className="d-flex flex-column justify-content-center">
              <Form.Group className="text-center">
                {/* Rendering image upload */}
                {image && (
                  <ProfileEditFormImageField
                    image={image}
                    errors={errors}
                    imageInput={imageInput}
                    profileData={profileData}
                    setProfileData={setProfileData}
                  />
                )}
              </Form.Group>
            </Container>

            <Container className={styles.FormFields}>
              {/* Component to render text fields */}
              <EditFormTextFields
                favouriteCharacter={favouriteCharacter}
                content={content}
                handleChange={handleChange}
                errors={errors}
              />
              {/* Buttons to save or cancel profile edit */}
              <Button
                className={`${btnStyles.Button} ${styles.EditButton}`}
                type="submit"
              >
                save
              </Button>
              <Button
                className={`${btnStyles.Button} ${styles.EditButton}`}
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

export default ProfileEditForm;
