import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="topHeader">
      <div className="header">
        <Link to="/">
          <h1 className="title">Solve.It</h1>
        </Link>
        <nav>
          {isLoggedIn ? (
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/issues">Issues</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  {" "}
                  Logout{" "}
                </Link>
                {/* <hr className="line"/> */}
              </li>
            </ul>
          ) : (
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/issues">Issues</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
