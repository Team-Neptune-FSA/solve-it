import React, { useEffect, useState } from "react";
import CodeEnvironment from "../CodeEnvironment";
import axios from "axios";
import history from "../../history";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const UnresolvedIssue = ({ match }) => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [issue, setIssue] = useState({});
  const [view, setView] = useState("workspace");
  const [currentSolution, setCurrentSolution] = useState({});
  const [dummy, setdummy] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const { issueId, solutionId } = match.params;
    const getIssueSolution = async () => {
      const { data: solution } = await axios.get(
        `/api/issues/${issueId}/solutions/${solutionId}`,
        { headers: { authorization: token } }
      );
      setCurrentSolution(solution);
      setCode(solution.code);
      setExplanation(solution.explanation);

      const { data: issue } = await axios.get(`/api/issues/${issueId}`);
      setIssue(issue);
    };
    getIssueSolution();
  }, [dummy]);

  const setSolutionCode = (code) => {
    setCode(code);
  };

  const handleAccept = async (solution, issue) => {
    setdummy(!dummy);
    const token = window.localStorage.getItem("token");
    //sets issue to isResolved
    await axios.put(`/api/issues/${issue.id}`, null, {
      headers: {
        authorization: token,
      },
    });
    //sets chosen solution to isAccepted
    await axios.put(
      `/api/issues/${issue.id}/solutions/${solution.id}`,
      {
        ...solution,
        isAccepted: true,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    //rejects all other solutions
    await axios.put(`/api/issues/${issue.id}/solutions`, {
      solutionId: solution.id,
    });
    //handles payment
    await axios.put("/api/stats", {
      issue,
      solution,
    });
  };

  const confirmAccept = (solution, issue) => {
    confirmAlert({
      title: "Confirm to accept answer",
      message: "Are you sure you want to accept this answer?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleAccept(solution, issue);
          },
        },
        {
          label: "No",
          onClick: () => console.log("back"),
        },
      ],
    });
  };

  return (
    <div className="contain-component">
      <div className="single-issue-btns">
        <div className="back" onClick={() => history.go(-1)}>
          <i className="fas fa-chevron-left"></i>
          Back
        </div>
        <div>
          <button
            onClick={() => setView("overview")}
            className={view === "overview" ? "active" : ""}
          >
            Overview
          </button>
          <button
            onClick={() => setView("workspace")}
            className={view === "workspace" ? "active" : ""}
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
          {issue.isResolved ? (
            <h2 className="resolved-issue">Issue Resolved</h2>
          ) : (
            <button
              onClick={() => confirmAccept(currentSolution, issue)}
              className="accept"
            >
              Accept Solution
            </button>
          )}
          <CodeEnvironment value={code} setSolutionCode={setSolutionCode} />
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default UnresolvedIssue;
