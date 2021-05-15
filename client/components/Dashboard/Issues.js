import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
      <div className="stats-section">You have raised {issuesAsked} issues.</div>
      <div className="dashboard-info">
        {userIssues.map((issue) => (
          <div key={issue.id}>
            <Link to={`/issues/${issue.id}`}>
              <h3>{issue.title}</h3>
            </Link>
            <div>
              {issue.solutions.map((solution) => (
                <Link
                  to={`/issues/${issue.id}/solutions/${solution.id}`}
                  key={solution.id}
                >
                  {solution.code && <code>{solution.code}</code>}
                  {solution.explanation && <p>{solution.explanation}</p>}
                </Link>
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
