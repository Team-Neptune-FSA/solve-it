import React from "react";
import { connect } from "react-redux";
import AllIssues from "./Issues/AllIssues"

/**
 * COMPONENT
 */

 const logo = document.querySelectorAll('#logo path');
 console.log(logo);
 
 export const Home = (props) => {
   const { name } = props;
   return (
     <div>
      <div className="titleScreen">
        <div id="search" className="container">
        <h1 className="prompt">Find the perfect freelance</h1>
        <h1 className="prompt">services for your coding problems!</h1>
        <br/>
        <br/>
        <h1 className="searchTitle">What Are You Looking For Today?</h1>
        </div>
      </div>

      <div className="browseIssues">

        <form className="browseIssues" method="get" action="/issues">
          <h1 className="looking">Looking to solve people's issues?</h1>
          <button className="browseButton" type="submit">
            Browse Issues
          </button>
        </form>

      </div>

      <div className="submitIssues">
        <form className="browseIssues" method="get" action="/issues/post">
          <h1 className="need">Need help with a problem?</h1>
          <button className="submitNewIssueButton" type="submit">
            Submit a new issue
          </button>
        </form>
      </div>

    {/* <AllIssues /> */}

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

