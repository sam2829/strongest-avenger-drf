import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

// This is for icons displayed in navbar when user is logged out
class LoggedOutNavIcons extends Component {
  render() {
    return (
      <>
        <NavLink activeClassName={styles.Active} to="/signin">
          <i className="fas fa-sign-in-alt"></i>Sign in
        </NavLink>
        <NavLink to="/signup" activeClassName={styles.Active}>
          <i className="fas fa-user-plus"></i>Sign up
        </NavLink>
      </>
    );
  }
}

export default LoggedOutNavIcons;
