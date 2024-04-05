import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../../styles/CommentCreateEditForm.module.css";

// Component for toggling agreement of post to display in comment
const CommentAgree = ({ agree, setAgree }) => {
  // Function to handle agreement toggle
  const handleAgree = () => {
    setAgree((prevAgree) => !prevAgree);
  };

  return (
    <>
      {/* Render agree icon if agree is true */}
      {agree && (
        <div className={styles.agreeIcon}>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Do you disagree!</Tooltip>}
          >
            <i
              className="fa-solid fa-circle-check"
              data-value={agree}
              onClick={handleAgree}
            ></i>
          </OverlayTrigger>
        </div>
      )}
      {/* Render disagree icon if agree is false */}
      {!agree && (
        <div className={styles.agreeIcon}>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Do you agree!</Tooltip>}
          >
            <i
              className="fa-regular fa-circle-check"
              data-value={agree}
              onClick={handleAgree}
            ></i>
          </OverlayTrigger>
        </div>
      )}
    </>
  );
};

export default CommentAgree;
