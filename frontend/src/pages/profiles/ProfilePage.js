import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";

import PopularProfiles from "./PopularProfiles";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";

import MainProfile from "./MainProfile";
import MainProfilePosts from "./MainProfilePosts";

// Functional Component for Profile Page
const ProfilePage = () => {
  // State variables
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  // Hooks

  const { id } = useParams();
  const { setProfileData } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile and profile posts data
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        // Update profile data in context
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  return (
    <>
      <Row>
        <Col lg={{ span: 8, offset: 1 }}>
          {/* Popular profiles component */}
          <PopularProfiles mobile />
          {/* Render main profile and posts if data has loaded */}
          {hasLoaded && (
            <>
              <Container className={appStyles.Content}>
                <MainProfile profile={profile} />
              </Container>
              <MainProfilePosts
                profile={profile}
                profilePosts={profilePosts}
                setProfilePosts={setProfilePosts}
              />
            </>
          )}
          {/* Render loading spinner if data has not loaded */}
          {!hasLoaded && (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
        <Col lg={{ span: 3 }} className="d-none d-lg-block">
          <PopularProfiles />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
