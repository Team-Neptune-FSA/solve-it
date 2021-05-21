import React, { useEffect, useState } from "react";
import CodeEnvironment from "../CodeEnvironment";
import axios from "axios";
import { Link } from "react-router-dom";

const UnresolvedIssue = ({ match }) => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [issue, setIssue] = useState({});
  const [view, setView] = useState("workspace");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const { issueId, solutionId } = match.params;
    const getIssueSolution = async () => {
      const { data: solution } = await axios.get(
        `/api/issues/${issueId}/solutions/${solutionId}`,
        { headers: { authorization: token } }
      );
      setCode(solution.code);
      setExplanation(solution.explanation);

      const { data: issue } = await axios.get(`/api/issues/${issueId}`);
      setIssue(issue);
    };
    getIssueSolution();
  }, []);

  const setSolutionCode = (code) => {
    setCode(code);
  };

  return (
    // <div>
    //   <h2>{issue.title}</h2>
    //   <p>{issue.description}</p>
    //   <button>ACCEPT</button>
    //   {/* <h1 style={{ color: "green" }}>ISSUE RESOLVED</h1> */}
    //   <CodeEnvironment value={code} setSolutionCode={setSolutionCode} />
    //   <br />
    //   <h2>EXPLANATION SECTION</h2>
    //   <p>{explanation}</p>
    // </div>

    // <div>
    <div className="contain-component">
      <div className="single-issue-btns">
        <Link to="/dashboard">
          <i className="fas fa-chevron-left"></i>
          Back To Dashboard
        </Link>
        <div>
          <button
            onClick={() => setView("overview")}
            className={view === "overview" && "active-btn"}
          >
            Overview
          </button>
          <button
            onClick={() => setView("workspace")}
            className={view === "workspace" && "active-btn"}
          >
            Workspace
          </button>
        </div>
      </div>

      {view === "overview" ? (
        <div className="overview">
          <div className="info">
            <h1 className="issueTitle">{issue.title}</h1>
            <p>{issue.description}</p>
          </div>
        </div>
      ) : (
        <div className="workspace">
          <CodeEnvironment value={code} setSolutionCode={setSolutionCode} />
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default UnresolvedIssue;
