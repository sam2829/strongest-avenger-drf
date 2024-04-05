import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  // Destructure props
  const { profile, mobile, imageSize = 35 } = props;
  const { id, following_id, image, owner } = profile;

  // Get current user from custom hook and check if owner of profile
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Hook to allow to follow and unfollow user
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      {/* Avatar image with link to profile page */}
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      {/* Display owner's name */}
      <div className={`mx-2 ${styles.WordBreak} ${styles.OwnerText}`}>
        <strong>{owner}</strong>
      </div>
      {/* Follow/Unfollow button depending on conditions */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.UnFollow}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Follow}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
