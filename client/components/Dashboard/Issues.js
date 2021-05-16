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

  const handleAccept = async (solutionId) => {
    console.log(solutionId);
  };

  const handleReject = async (solutionId) => {
    console.log(solutionId);
  };

  const toggleStar = async (solutionId) => {
    console.log(solutionId);
  };

  return (
    <>
      <div className="stats-section">You have raised {issuesAsked} issues.</div>
      <div className="dashboard-info">
        {userIssues.map((issue) => (
          <div className="issue" key={issue.id}>
            <Link to={`/issues/${issue.id}`}>
              <h3>{issue.title}</h3>
            </Link>
            <p>{issue.description}</p>
            <div className="box">
              {issue.solutions.map((solution, idx) => (
                <div className="issue-solution" key={solution.id}>
                  <div className="flex">
                    <Link to={`/issues/${issue.id}/solutions/${solution.id}`}>
                      <h3>Solution #{idx + 1}</h3>
                    </Link>
                    <i
                      onClick={() => toggleStar(solution.id)}
                      className={
                        solution.isStarred
                          ? "fas fa-star blue"
                          : "far fa-star blue"
                      }
                    ></i>
                  </div>
                  {solution.code && <code>{solution.code}</code>}
                  {solution.explanation && <p>{solution.explanation}</p>}
                  <button
                    onClick={() => handleAccept(solution.id)}
                    className="btn blue-bg white">Accept Solution</button>
                  <button
                    onClick={() => handleReject(solution.id)}
                    className="btn black-bg white"
                  >
                    Reject Solution
                  </button>
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
