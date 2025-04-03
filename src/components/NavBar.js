// React
import React from "react";
import { NavLink } from "react-router-dom";

// API
import axios from "axios";

// Assets
import logo from "../assets/logo.png";

// Bootstrap Components
import { Navbar, Container, Nav } from "react-bootstrap";

// Bootstrap Icons
import { BoxArrowInLeft } from "react-bootstrap-icons";
import { BoxArrowInRight } from "react-bootstrap-icons";
import { Heart } from "react-bootstrap-icons";
import { House } from "react-bootstrap-icons";
import { List } from "react-bootstrap-icons";
import { PersonPlusFill } from "react-bootstrap-icons";
import { PlusSquare } from "react-bootstrap-icons";

// Context
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";

// CSS
import styles from "../styles/NavBar.module.css";

// Local Components
import Avatar from "./Avatar";
import UseClickOutsideToggle from "../hooks/UseClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = UseClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink
      className={({ isActive }) =>
        `${styles.NavLink} ${isActive ? styles.Active : ""}`
      }
      to="/posts/create"
    >
      <PlusSquare size={24} className="m-2" />
    </NavLink>
  );

  const loggedInIcons = (
    <>
      {/* FEED */}
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} ${isActive ? styles.Active : ""}`
        }
        to="/feed"
      >
        <List size={24} className="m-2" />
      </NavLink>

      {/* LIKED */}
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} ${isActive ? styles.Active : ""}`
        }
        to="/liked"
      >
        <Heart size={24} className="m-2" />
      </NavLink>

      {/* SIGN OUT */}
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <BoxArrowInRight size={24} className="m-2" />
      </NavLink>

      {/* Profile */}
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text=""
          height={40}
          className="m-2"
        />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      {/* SIGN IN */}
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} ${isActive ? styles.Active : ""}`
        }
        to="/signin"
      >
        <BoxArrowInLeft size={24} className="m-2" />
      </NavLink>

      {/* SIGN UP */}
      <NavLink
        to="/signup"
        className={({ isActive }) =>
          `${styles.NavLink} ${isActive ? styles.Active : ""}`
        }
      >
        <PersonPlusFill size={24} className="m-2" />
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="pt-3">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={({ isActive }) =>
                `${styles.NavLink} ${isActive ? styles.Active : ""}`
              }
              to="/"
            >
              <House size={24} className="m-2" />
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
