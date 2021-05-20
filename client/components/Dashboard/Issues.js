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
  const [dummy, setdummy] = useState(true);
  const { getCurrentUser } = useAuth();
  const [view, setView] = useState("unresolved");
  const [toggleView, setToggleView] = useState("solutions");
  const [allIssuesQuestions, setAllIssuesQuestions] = useState([]);
  const [answer, setAnswer] = useState({});

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
    const getAllIssuesQuestions = async () => {
      const { data: issueQuestions } = await axios.get(
        "/api/issues/questions",
        {
          headers: {
            authorization: token,
          },
        }
      );
      setAllIssuesQuestions(issueQuestions);
    };
    getAllIssuesQuestions();
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

  // const toggleStar = async (solution, issue) => {
  //   const token = window.localStorage.getItem('token');
  //   setdummy(!dummy);
  //   await axios.put(
  //     `/api/issues/${issue.id}/solutions/${solution.id}`,
  //     {
  //       ...solution,
  //       isStarred: !solution.isStarred,
  //     },
  //     {
  //       headers: {
  //         authorization: token,
  //       },
  //     }
  //   );
  // };

  const handleAnswer = async (event, questionId) => {
    const token = window.localStorage.getItem("token");
    event.preventDefault();
    const theAnswer = answer[questionId];
    await axios.put(
      `/api/issues/questions/${questionId}/answer`,
      { theAnswer },
      { headers: { authorization: token } }
    );
    setdummy(!dummy);
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
                            {/* <i
                          onClick={() => toggleStar(solution, issue)}
                          className={
                            solution.isStarred
                              ? 'fas fa-star blue'
                              : 'far fa-star blue'
                          }
                        ></i> */}
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
                              onClick={() => confirmAccept(solution, issue)}
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
            {allIssuesQuestions.length ? (
              <>
                {allIssuesQuestions.map((issues) => {
                  return (
                    <div key={issues.id}>
                      <div>Title: {issues.title}</div>
                      <div>Description: {issues.description}</div>
                      <>
                        {issues.questions.length ? (
                          <>
                            {issues.questions.map((question) => (
                              <div key={question.id}>
                                <div>Question: {question.questionContent}</div>
                                <div>Answer:</div>
                                <input
                                  type="text"
                                  value={answer[question.id] || ""}
                                  onChange={(event) => {
                                    let newAnswer = { ...answer };
                                    newAnswer[question.id] = event.target.value;
                                    setAnswer(newAnswer);
                                  }}
                                />
                                <button
                                  onClick={(event) =>
                                    handleAnswer(event, question.id)
                                  }
                                >
                                  Submit Answer
                                </button>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div></div>
                        )}
                      </>
                    </div>
                  );
                })}
              </>
            ) : (
              <div>No questions!</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Issues;
