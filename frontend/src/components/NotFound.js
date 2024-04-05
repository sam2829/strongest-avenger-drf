import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
  return (
    <Container className={styles.NotFoundContent}>
      <div>
        <Asset
          src={NoResults}
          message={`Sorry, the page you're looking for doesn't exist`}
        />
      </div>
      <div className="text-center my-3">
        <Link to="/">
          <span className={styles.Link}>Click to return to Home page</span>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
