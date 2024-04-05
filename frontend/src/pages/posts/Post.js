import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import PostLikeIcon from "./PostLikeIcon";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";

// Post component to display a single post
const Post = (props) => {
  // Destructure props to access post data
  const {
    id,
    owner,
    character_name,
    comments_count,
    content,
    image,
    like_id,
    likes_count,
    profile_id,
    profile_image,
    title,
    updated_at,
    video,
    postPage,
    setPosts,
  } = props;

  // Get current user and if if user is owner of post
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // Function to edit post
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // function to delete post
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.PostContainer}>
      <Card.Body className={styles.PostBody}>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            {/* Display post owner's avatar */}
            <Avatar src={profile_image} height={45} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            {/* Display post's last updated time */}
            <span>{updated_at}</span>
            {/* Display dropdown menu for post actions if user is the owner and it's a post page */}
            {is_owner && postPage && (
              <MoreDropdown
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )}
          </div>
        </Media>
        <Card.Title className={styles.PostTitle}>
          <div>
            {/* Display character name */}
            <span>{character_name}</span>
          </div>
        </Card.Title>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        {/* if post contains an image the image will be displayed */}
        {image && !video && (
          <Card.Img src={image} alt={title} className={styles.PostMedia} />
        )}
        {/* if the post contains a video the video will be displayed */}
        {!image && video && (
          <Card.Body className="p-0">
            <video src={video} className={styles.PostMedia} controls>
              Your browser does not support the video tag.
            </video>
          </Card.Body>
        )}
      </Link>
      <Card.Body className={styles.PostBody}>
        <Card.Title className={styles.PostTitle}>{title}</Card.Title>
        <Card.Text className="text-center py-2">{content}</Card.Text>
        <div className={styles.PostIcons}>
          <div className={styles.IconContainer}>
            {/* Component for handling post like */}
            <PostLikeIcon
              id={id}
              is_owner={is_owner}
              like_id={like_id}
              likes_count={likes_count}
              currentUser={currentUser}
              setPosts={setPosts}
            />
          </div>
          <div className={styles.IconContainer}>
            <Link to={`/posts/${id}`}>
              <i className="far fa-comments" />
            </Link>
            {/* Display comments count */}
            {comments_count}
          </div>
          {/* Display exclamation icon for reporting post if user is logged in */}
          {currentUser && (
            <div className={styles.IconContainer}>
              <Link to={`/report/${id}`}>
                <i className="fa-solid fa-circle-exclamation"></i>
              </Link>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
