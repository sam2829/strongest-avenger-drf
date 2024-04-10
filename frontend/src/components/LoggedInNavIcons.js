import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import styles from "../styles/NavBar.module.css";

// This is for icons displayed in navbar when user is logged in
class LoggedInNavIcons extends Component {
  render() {
    const { currentUser, handleSignOut } = this.props;

    // The add post icon in navbar
  const addPostIconDropDown = (
    <NavLink
      activeClassName={styles.Active}
      to="/posts/create"
      className = "d-block d-sm-none"
    >
      <i className="far fa-plus-square "></i>Add post
    </NavLink>
  );
    return (
      <>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/feed"
        >
          <i className="fa-solid fa-bars"></i>Feed
        </NavLink>
        <NavLink activeClassName={styles.Active} to="/liked">
          <i className="fa-solid fa-heart"></i>Liked
        </NavLink>
        <NavLink to="/" onClick={handleSignOut}>
          <i className="fa-solid fa-right-from-bracket"></i>Sign out
        </NavLink>
        <NavLink to={`/profiles/${currentUser?.profile_id}`}>
          <Avatar src={currentUser?.profile_image} text="Profile" height={35} />
        </NavLink>
        {addPostIconDropDown}
      </>
    );
  }
}

export default LoggedInNavIcons;
