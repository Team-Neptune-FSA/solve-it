import React from "react";
import { connect } from "react-redux";
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
            <button className="issueButton" type="submit">Search Issues</button>
            <button className="submitButton" type="submit">Search Solutions</button>
          </form>
        </div>
      </div>

      <div className="browseIssues">
        <form className="browseIssues" method="get" action="/issues">
          <h1>Looking for solve people's issues?</h1>
          <button className="browseButton" type="submit">
            Browse Issues
          </button>
        </form>
      </div>

      <div className="submitIssues">
        <form className="browseIssues" method="get" action="/issues/post">
          <h1>Need help with a problem?</h1>
          <button className="submitNewIssueButton" type="submit">
            Submit a new issue
          </button>
        </form>
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
