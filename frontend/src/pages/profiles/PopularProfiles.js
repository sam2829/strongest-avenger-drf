import React from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/PopularProfiles.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  // Call popular profiles context
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${styles.ProfileContainer} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {/*rendering based on whether popularProfiles exist and have results */}
      {popularProfiles?.results?.length ? (
        <>
          {/* Container for header */}
          <Container className={styles.HeaderProfiles}>
            <p>Most followed profiles.</p>
          </Container>
          {/* What is rendered in mobile */}
          {mobile && (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          )}
          {/* Render profiles normally if not mobile */}
          {!mobile &&
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
        </>
      ) : (
        // Render spinner when loading or no profiles
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
