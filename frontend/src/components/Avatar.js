import React from "react";
import styles from "../styles/Avatar.module.css";

// Avatar component to display an avatar image
const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height} // ensures width matches height
        alt="avatar"
      />
      {/* Display text */}
      {text}
    </span>
  );
};

export default Avatar;
