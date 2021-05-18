import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Search from "./Search";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { name } = props;
  return (
    <div>
      <div className="titleScreen">
        <div id="search" className="container">
          <h1 className="searchTitle">What Are You Looking For?</h1>
          <input
            className="searchbar"
            type="text"
            placeholder="Search.."
          ></input>
          <form method="get" action="/issues">
            <button className="issueButton" type="submit">
              Search Issues
            </button>
            <button className="submitButton" type="submit">
              Search Solutions
            </button>
          </form>
        </div>
      </div>

      <div className="browseIssues">
        <h1>Looking to solve coding issues for cash?</h1>
        <Link to="/issues">
          <button className="browseButton">Browse Issues</button>
        </Link>
      </div>

      <div className="submitIssues">
        <h1>Need help with a problem?</h1>
        <Link to="/issues/post">
          <button className="submitNewIssueButton">Submit a new issue</button>
        </Link>
      </div>

      {/* <div className="slider">
        <h1>Javascript</h1>
        <h1>Python</h1>
      </div> */}
    </div>
  );
};

// CONTAINER
const mapState = (state) => {
  return {
    name: state.auth.name,
  };
};

export default connect(mapState)(Home);
