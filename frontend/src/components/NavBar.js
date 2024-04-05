import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import LoggedInNavIcons from "./LoggedInNavIcons";
import LoggedOutNavIcons from "./LoggedOutNavIcons";
import UseClickOutsideToggle from "../hooks/UseClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

// Navabr component to display Navbar
const NavBar = ({ showAlert }) => {
  // Retrieve and set current user
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // This is so we can toggle the hamburger menu
  const { expanded, setExpanded, ref } = UseClickOutsideToggle();

  // This is the function so user can sign out
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      showAlert("success", "You have successfully signed out!");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log("Sign out failed:", err);
    }
  };

  // The add post icon in navbar
  const addPostIcon = (
    <NavLink
      activeClassName={styles.Active}
      to="/posts/create"
      className="mr-auto"
    >
      <i className="far fa-plus-square"></i>Add post
    </NavLink>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="lg"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="58" />
          </Navbar.Brand>
        </NavLink>
        <NavLink className="mr-auto pr-5 d-sm-inline d-none" to="/">
          STRONGEST
          <br />
          AVENGER
        </NavLink>
        {/* Display 'Add post' link if user is logged in */}
        {currentUser && addPostIcon}
        {/* Hamburger menu toggle */}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact activeClassName={styles.Active} to="/">
              <i className="fas fa-home"></i>Home
            </NavLink>
            {/* Display Navbar items based on if logged in or out */}
            {currentUser ? (
              <LoggedInNavIcons
                currentUser={currentUser}
                handleSignOut={handleSignOut}
              />
            ) : (
              <LoggedOutNavIcons />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
