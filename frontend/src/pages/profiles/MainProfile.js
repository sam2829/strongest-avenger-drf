import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Component rendering the main profile section
const MainProfile = ({ profile }) => {
  // Check if user is logged in and the owner
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;

  // Hook to allow to follow and unfollow user
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <>
      {/* Drop down menu so user can edit own profile */}
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      {/* Profile information layout */}
      <Row className="text-center px-4">
        <Col lg={3}>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        {/* Profile owner and favorite character */}
        <Col lg={4}>
          <h5 className={`${styles.WordBreak} m-4`}>{profile?.owner}</h5>
          <h5 className="mt-4">Favourite Character:</h5>
          <h5 className={styles.FavCharacter}>
            {profile?.favourite_character}
          </h5>
        </Col>
        {/* Profile stats: posts, followers, following */}
        <Col lg={3}>
          <p className="m-4">
            Posts:{" "}
            <span className={styles.Counters}>{profile?.posts_count}</span>
          </p>
          <p className="mx-4">
            Followers:{" "}
            <span className={styles.Counters}>{profile?.followers_count}</span>
          </p>
          <p className="m-4">
            Following:{" "}
            <span className={styles.Counters}>{profile?.following_count}</span>
          </p>
        </Col>
        {/* Follow/Unfollow button */}
        <Col lg={2} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.ProfilePageUnFollow}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.ProfilePageFollow}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
      </Row>
      {/* About me section */}
      <Row>
        <Col>
          <p className="mx-3">About me:</p>
          <p className="m-3">{profile?.content}</p>
        </Col>
      </Row>
    </>
  );
};

export default MainProfile;
