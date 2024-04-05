import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import styles from "../styles/SearchBy.module.css";
import appStyles from "../App.module.css";

// Functional component SearchBy
const SearchBy = ({ mobile }) => {
  return (
    <Container
      className={`${appStyles.Content} ${styles.SearchByContainer} ${
        mobile && "d-lg-none text-center"
      }`}
    >
      {/* Search by header */}
      <Container className={styles.SearchByHeader}>
        <p>Search by:</p>
      </Container>
      <Container
        className={`d-flex ${mobile ? "justify-content-around" : "flex-column"}`}
      >
        {/* NavLink components for different character categories */}
        <div className={`${mobile ? "mb-2" : "my-3"}`}>
          <div>
            <NavLink
              className={styles.SearchByLinks}
              to="/character_category/avenger"
              activeClassName={styles.ActiveLink}
            >
              <span>Avenger</span>
            </NavLink>
          </div>
        </div>
        <div className={`${mobile ? "mb-2 px-2" : "my-3"}`}>
          <div>
            <NavLink
              className={styles.SearchByLinks}
              to="/character_category/x-men"
              activeClassName={styles.ActiveLink}
            >
              <span>X-Men</span>
            </NavLink>
          </div>
        </div>
        <div className={`${mobile ? "mb-2 px-2" : "my-3"}`}>
          <div>
            <NavLink
              className={styles.SearchByLinks}
              to="/character_category/anti-hero"
              activeClassName={styles.ActiveLink}
            >
              <span>Anti-hero</span>
            </NavLink>
          </div>
        </div>
        <div className={`${mobile ? "mb-2" : "my-3"}`}>
          <div>
            <NavLink
              className={styles.SearchByLinks}
              to="/character_category/villain"
              activeClassName={styles.ActiveLink}
            >
              <span>Villain</span>
            </NavLink>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default SearchBy;
