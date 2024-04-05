import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

// Asset component to display different content, spinner, image, and message
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {/* Display spinner */}
      {spinner && <Spinner animation="border" />}
      {/* Display an image */}
      {src && <img src={src} alt={message} />}
      {/*Display message */}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
