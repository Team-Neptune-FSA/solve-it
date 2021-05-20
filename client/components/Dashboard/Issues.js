import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Issues = () => {
  const [unresolved, setunresolved] = useState([]);
  const [resolved, setresolved] = useState([]);
  const [current, setcurrent] = useState([]);
  const [dummy, setdummy] = useState("");
  const { getCurrentUser } = useAuth();
  const [view, setView] = useState("unresolved");


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    getCurrentUser();
    const getUserIssues = async () => {
      const { data: userIssues } = await axios.get("/api/users/issues", {
        headers: {
          authorization: token,
        },
      });
      setresolved(userIssues.filter((issue) => issue.isResolved));
      setunresolved(userIssues.filter((issue) => !issue.isResolved));
      setcurrent(userIssues.filter((issue) => !issue.isResolved));
    };
    getUserIssues();
  }, [dummy]);

  const filterIssues = (e) => {
    if (e.target.value === "Unresolved") {
      setcurrent(unresolved);
      setView("unresolved");
    } else {
      setcurrent(resolved);
      setView("resolved");
    }
  };

  const handleAccept = async (solution, issue) => {
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
            setdummy("bang");
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
    <>

      <div className="stats-section dashboard-solution-left">Post an Issue</div>

      <div className="dashboard-info">
        <div className="custom-select">
          <select className="filterOptions" onChange={filterIssues}>
            <option value="Unresolved">Unresolved</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        {current.length >= 1 ? (
          <div>
            {current.map((issue) => (
              <div className="issue" key={issue.id}>
                <Link to={`/issues/${issue.id}`}>
                  <h3>Issue Title: {issue.title}</h3>
                  <p>Issue Description: {issue.description}</p>
                </Link>
                <p>Issue Price: ${(issue.price / 100).toFixed(2)}</p>
                <div>
                  {issue.solutions.map((solution, idx) => (
                    <div
                      className={`issue-solution box ${
                        solution.isRejected && "rejected"
                      }`}
                      key={solution.id}
                    >
                      <div className="flex">
                        <Link
                          to={`/issues/${issue.id}/solutions/${solution.id}`}
                        >
                          <h3>Solution #{idx + 1}</h3>
                        </Link>
                      </div>
                      <Link to={`/issues/${issue.id}/solutions/${solution.id}`}>
                        {solution.code && <code>{solution.code}</code>}
                        {solution.explanation && <p>{solution.explanation}</p>}
                      </Link>
                      {view === "unresolved" ? (
                        <button
                          onClick={() => confirmAccept(solution, issue)}
                          className="btn blue white"
                        >
                          Accept Solution
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <br />
            <p>Looks like you have no issues here, must be nice!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Issues;
