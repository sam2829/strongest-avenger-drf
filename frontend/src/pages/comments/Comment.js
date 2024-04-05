import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";

// Comment component to display a single comment
const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    agree,
    setPost,
    setComments,
  } = props;

  // Get current user and if if user is owner of post
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // State to show the comment edit form
  const [showEditForm, setShowEditForm] = useState(false);

  // Function to handle comment deletion
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <div>
      {/* Horizontal line to separate comments */}
      <hr />
      <Media className="align-items-center">
        <Link
          to={`/profiles/${profile_id}`}
          className="d-flex align-items-center"
        >
          {/* Avatar of the comment owner */}
          <Avatar src={profile_image} height={35} />
          <span className={`ml-2 ${styles.Owner}`}>{owner}</span>
        </Link>
        <div className="ml-auto d-flex align-items-center">
          {/* Display date and MoreDropdown on the right */}
          <span className={styles.Date}>{updated_at}</span>
          {is_owner && !showEditForm && (
            <div className="ml-1">
              <MoreDropdown
                handleEdit={() => setShowEditForm(true)}
                handleDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </Media>
      {/* Row to display comment content and agree/disagree icons */}
      {!showEditForm && (
        <div className="my-2 d-flex align-items-center">
          <div className="text-left flex-grow-1">
            <p className={styles.Content}>{content}</p>
          </div>
          {/* Displays icon if user agreed */}
          {agree && (
            <div className={styles.Tick}>
              <i className="fa-solid fa-circle-check"></i>
            </div>
          )}
          {/* Displays icon if user disagreed */}
          {!agree && (
            <div className={styles.Cross}>
              <i className="fa-solid fa-circle-xmark"></i>
            </div>
          )}
        </div>
      )}
      {/* show comment edit form */}
      {showEditForm && (
        <CommentEditForm
          id={id}
          content={content}
          setComments={setComments}
          setShowEditForm={setShowEditForm}
          agreeProp={agree}
        />
      )}
    </div>
  );
};

export default Comment;
