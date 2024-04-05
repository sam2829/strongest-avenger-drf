import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import appStyles from "../../App.module.css";
import commentStyles from "../../styles/CommentCreateEditForm.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentRender from "../comments/CommentRender";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import SearchBy from "../../components/SearchBy";

// PostPage component displays a single post along with its comments
const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [loading, setLoading] = useState(true);

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch post and comments data from the server
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setLoading(false);
        setComments(comments);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <>
      <Row>
        <Col lg={{ span: 2 }} className="d-none d-lg-block">
          <SearchBy />
        </Col>
        <Col lg={{ span: 6, offset: 1 }}>
          <PopularProfiles mobile />
          <SearchBy mobile />
          {loading && (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
          {!loading && (
            <Post {...post.results[0]} setPosts={setPost} postPage />
          )}
        </Col>
        <Col lg={{ span: 2, offset: 1 }} className="d-none d-lg-block">
          <PopularProfiles />
        </Col>
        {/* Comments section */}
        <Col lg={{ span: 6, offset: 3 }}>
          <Container className={commentStyles.commentContainer}>
            <h3 className={commentStyles.CommentTitle}>Comments</h3>
            {/* Display comment creation form if user is logged in */}
            {currentUser && (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                post={id}
                setPost={setPost}
                setComments={setComments}
              />
            )}
            {/* Render comments */}
            <InfiniteScroll
              loader={<Asset spinner />}
              dataLength={comments.results.length}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            >
              <CommentRender
                comments={comments}
                currentUser={currentUser}
                setPost={setPost}
                setComments={setComments}
              />
            </InfiniteScroll>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default PostPage;
