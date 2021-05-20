import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Issues = () => {
  const [unresolved, setunresolved] = useState([]);
  const [resolved, setresolved] = useState([]);
  const [current, setcurrent] = useState([]);
  const [dummy, setdummy] = useState(true);
  const { getCurrentUser } = useAuth();
  const [view, setView] = useState("unresolved");
  const [toggleView, setToggleView] = useState("solutions");
  const [question, setQuestion] = useState("solutions");

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

    // ------------------how to get this to work?--------------------
    const getIssueQuestion = async () => {
      const { data: issueQuestion } = await axios.get(
        "/api/issues/issueId/questions", //find the issueId ${}
        {
          headers: {
            authorization: token,
          },
        }
      );
      setQuestion(issueQuestion);
    };
    getIssueQuestion();
    // ------------------how to get this to work?--------------------
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

  // const handleReject = async (solution, issue) => {
  //   setdummy(!dummy);
  //   const token = window.localStorage.getItem('token');
  //   await axios.put(
  //     `/api/issues/${issue.id}/solutions/${solution.id}`,
  //     {
  //       ...solution,
  //       isRejected: true,
  //     },
  //     {
  //       headers: {
  //         authorization: token,
  //       },
  //     }
  //   );
  // };

  const toggleStar = async (solution, issue) => {
    const token = window.localStorage.getItem("token");
    setdummy(!dummy);
    await axios.put(
      `/api/issues/${issue.id}/solutions/${solution.id}`,
      {
        ...solution,
        isStarred: !solution.isStarred,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  };

  return (
    <>
      <div className="dashboard-info">
        <div className="custom-select">
          <select className="filterOptions" onChange={filterIssues}>
            <option value="Unresolved">Unresolved</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        {toggleView === "solutions" ? (
          <>
            <button onClick={() => setToggleView("questions")}>Question</button>
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
                            <i
                              onClick={() => toggleStar(solution, issue)}
                              className={
                                solution.isStarred
                                  ? "fas fa-star blue"
                                  : "far fa-star blue"
                              }
                            ></i>
                          </div>
                          <Link
                            to={`/issues/${issue.id}/solutions/${solution.id}`}
                          >
                            {solution.code && <code>{solution.code}</code>}
                            {solution.explanation && (
                              <p>{solution.explanation}</p>
                            )}
                          </Link>
                          {view === "unresolved" ? (
                            <button
                              onClick={() => handleAccept(solution, issue)}
                              className="btn blue white"
                            >
                              Accept Solution
                            </button>
                          ) : (
                            <div></div>
                          )}
                          {/* <button
                          onClick={() => handleReject(solution, issue)}
                          className="btn black-bg white"
                        >
                          Reject Solution
                        </button> */}
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
          </>
        ) : (
          <>
            <button onClick={() => setToggleView("solutions")}>
              Solutions
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Issues;
