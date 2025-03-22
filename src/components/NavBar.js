/// IMPORTS ///

// React
import React from "react";
import { NavLink } from "react-router-dom";

// CSS
import styles from "../styles/NavBar.module.css";

// Assets
import logo from "../assets/logo.png";

// Bootstrap Components
import { Navbar, Container, Nav } from "react-bootstrap";
import {House } from "react-bootstrap-icons";
import { BoxArrowInLeft } from "react-bootstrap-icons";
import { BoxArrowInRight } from "react-bootstrap-icons";
import { PersonPlusFill } from "react-bootstrap-icons";


const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="pt-3">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={({ isActive }) => `${styles.NavLink} ${isActive ? styles.Active : ''}`}
              to="/"
            >
              <House size={24} className="mr-2" />
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => `${styles.NavLink} ${isActive ? styles.Active : ''}`}
              to="/signin"
            >
              <BoxArrowInLeft size={24} className="mr-2" />
              Sign in
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => `${styles.NavLink} ${isActive ? styles.Active : ''}`}
            >
              <PersonPlusFill size={24} className="mr-2" />
              Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;