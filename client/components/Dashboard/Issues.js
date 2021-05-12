import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { me } from "../../store";

const Issues = ({ user: { issuesAsked }, loadInitialData }) => {
  const [userIssues, setUserIssues] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    loadInitialData();
    const getUserIssues = async () => {
      const { data: userIssues } = await axios.get("/api/users/issues", {
        headers: {
          authorization: token,
        },
      });
      setUserIssues(userIssues);
    };
    getUserIssues();
  }, []);

  console.log(userIssues);
  return (
    <>
      <div id="info-section">You have raised {issuesAsked} issues.</div>
      <div>
        {userIssues.map((issue) => (
          <div className="issues" key={issue.id}>
            <h3>{issue.title}</h3>
            <div className="solutions">
              {issue.solutions.map((solution) => (
                <div className="solution-preview" key={solution.id}>
                  {solution.code && <code>{solution.code}</code>}
                  {solution.explanation && <p>{solution.explanation}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  loadInitialData: () => dispatch(me()),
});

export default connect(mapState, mapDispatch)(Issues);
