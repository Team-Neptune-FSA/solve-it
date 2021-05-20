import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div className="titleScreen">
        <div id="search" className="container">
          <h1 className="prompt">Find the perfect freelance</h1>
          <h1 className="prompt">services for your coding problems!</h1>
          <br />
          <br />
          <h1 className="searchTitle">What Are You Looking For Today?</h1>
        </div>
      </div>

      <div className="browseIssues">
        <h1 className="looking">Looking to solve people's issues?</h1>
        <Link to="/issues">
          <button className="browseButton">Browse Issues</button>
        </Link>
      </div>

      <div className="submitIssues">
        <h1 className="need">Need help with a problem?</h1>
        <Link to="/issues/post">
          <button className="submitNewIssueButton">Submit a new issue</button>
        </Link>
      </div>

      {/* <AllIssues /> */}
    </div>
  );
};

export default Home;
