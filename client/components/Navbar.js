import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
// import styled from "styled-components";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="topHeader">
  <div className="header">
    <h1 className="title">Solve.It</h1>
    <nav>
      {isLoggedIn ? (
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/issues">Issues</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/" onClick={handleClick}>
              {" "}
              Logout{" "}
            </a>
          {/* <hr className="line"/> */}
          </li>
        </ul>
      ) : (
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="Issues">Issues</a>
          </li>
          <li>
            <a href="Login">Login</a>
          </li>
          <li>
            <a href="Signup">Signup</a>
          </li>
        </ul>
      )}
    </nav>
  </div>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
