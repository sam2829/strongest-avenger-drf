import React from "react";
import Comment from "../comments/Comment";
import commentStyles from "../../styles/CommentCreateEditForm.module.css";

// CommentRender component to render a list of comments
const CommentRender = ({ comments, currentUser, setPost, setComments }) => {
  return (
    <>
      {/* Check if there are comments */}
      {comments.results.length ? (
        comments.results.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            setPost={setPost}
            setComments={setComments}
          />
        ))
      ) : (
        // If there are no comments, display a message depending if user has signed in
        <p className={commentStyles.Message}>
          {currentUser
            ? "No comments, be the first to comment!"
            : "No comments... yet"}
        </p>
      )}
    </>
  );
};

export default CommentRender;
