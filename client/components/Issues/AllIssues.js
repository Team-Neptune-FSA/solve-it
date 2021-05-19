import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const getIssues = async () => {
      const { data: allIssues } = await axios.get("/api/issues/");
      setIssues(allIssues);
    };
    getIssues();
  }, []);

  return (
    <div className="component">
      <div className="search">
        <input className="searchbar" type="text" placeholder="Search.."></input>
      </div>

      <div className="postIssue">
        <Link to="/issues/post">
          <button className="post-issue-button">Post an Issue</button>
        </Link>
      </div>

      <br />

      <div className="allIssues">
        <h1 className="all-issues-title">All Issues</h1>
        {issues.length ? (
          issues
            .map((issue) => (
              <div key={issue.id} className="single-issue">
                <div className="insideAllIssues">
                  <h2 className="issueTitle">{issue.title}</h2>
                  <p>{issue.description}</p>
                  <Link to={`/issues/${issue.id}`}>
                    <button className="btn blue-bg white">Solve</button>
                  </Link>
                  <h1 className="issue-price">
                    ${(issue.price / 100).toFixed(2)}
                  </h1>
                </div>
              </div>
            ))
            .reverse()
        ) : (
          <h2 className="none-in-database">There are no issues, sorry.</h2>
        )}
      </div>
    </div>
  );
};

export default AllIssues;
