import React from "react";
import styles from "../../styles/Post.module.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";

// PostLikeIcon component renders the like icon for a post
const PostLikeIcon = ({
  id,
  is_owner,
  like_id,
  likes_count,
  currentUser,
  setPosts,
}) => {
  // Function to handle like action
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      // Update the posts state with new like data
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  // Function to handle unlike action
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      // Update the posts state with new unlike data
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      {/* Render different like icons based on conditions */}
      {is_owner ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>You can't like your own post!</Tooltip>}
        >
          <i className="far fa-heart" />
        </OverlayTrigger>
      ) : like_id ? (
        // Unlike action
        <span onClick={handleUnlike}>
          <i className={`fas fa-heart ${styles.Heart}`} />
        </span>
      ) : currentUser ? (
        // Like action
        <span onClick={handleLike}>
          <i className={`far fa-heart ${styles.HeartOutline}`} />
        </span>
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to like posts!</Tooltip>}
        >
          <i className="far fa-heart" />
        </OverlayTrigger>
      )}
      {/* Display likes count */}
      {likes_count}
    </>
  );
};

export default PostLikeIcon;
