import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Issues = () => {
  const [unresolved, setunresolved] = useState([]);
  const [resolved, setresolved] = useState([]);
  const [current, setcurrent] = useState([]);
  const [dummy, setdummy] = useState(true);
  const { getCurrentUser } = useAuth();
  const [view, setView] = useState('unresolved');
  const [toggleView, setToggleView] = useState('solutions');
  const [allIssuesQuestions, setAllIssuesQuestions] = useState([]);
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    getCurrentUser();
    const getUserIssues = async () => {
      const { data: userIssues } = await axios.get('/api/users/issues', {
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
        '/api/issues/questions',
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
    if (e.target.value === 'Unresolved') {
      setcurrent(unresolved);
      setView('unresolved');
    } else {
      setcurrent(resolved);
      setView('resolved');
    }
  };

  const handleAccept = async (solution, issue) => {
    const token = window.localStorage.getItem('token');
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
    await axios.put('/api/stats', {
      issue,
      solution,
    });
  };

  const confirmAccept = (solution, issue) => {
    confirmAlert({
      title: 'Confirm to accept answer',
      message: 'Are you sure you want to accept this answer?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setdummy('bang');
            handleAccept(solution, issue);
          },
        },
        {
          label: 'No',
          onClick: () => console.log('back'),
        },
      ],
    });
  };

  const handleAnswer = async (event, questionId) => {
    const token = window.localStorage.getItem('token');
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
    <div className="parent-issue">
      <div className="issue-section">
        <h1 className="issue-question">What are you looking for?</h1>
        <br />
        <p>Post an issue and recieve specialized answers!</p>
        <br />
        <Link to="/issues/post">
          <button className="post-issue-button">Post an Issue</button>
        </Link>
      </div>

      <div className="dashboard-info">
        <div className="resolved-question"></div>

        <div className="resolved-filter-and-question">
          <div className="custom-select">
            <select className="filterOptions" onChange={filterIssues}>
              <option value="Unresolved">Unresolved</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="issue-question-button">
            <button
              className={
                toggleView === 'questions'
                  ? 'question-button-active'
                  : 'question-button'
              }
              onClick={() => setToggleView('questions')}
            >
              Question
            </button>
          </div>
          <div className="issue-question-button">
            <button
              className={
                toggleView === 'solutions'
                  ? 'question-button-active'
                  : 'question-button'
              }
              onClick={() => setToggleView('solutions')}
            >
              Solutions
            </button>
          </div>
        </div>

        {toggleView === 'solutions' ? (
          <>
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
                            solution.isRejected && 'rejected'
                          }`}
                          key={solution.id}
                        >
                          {/* <div className="flex"> */}
                          <Link
                            to={`/issues/${issue.id}/solutions/${solution.id}`}
                          >
                            <h3>Solution #{idx + 1}</h3>
                          </Link>
                          {/* </div> */}
                          <Link
                            to={`/issues/${issue.id}/solutions/${solution.id}`}
                          >
                            {solution.code && <code>{solution.code}</code>}
                            {solution.explanation && (
                              <p>{solution.explanation}</p>
                            )}
                          </Link>
                          {view === 'unresolved' ? (
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
          </>
        ) : (
          <>
            {/* <button onClick={() => setToggleView('solutions')}>Solutions</button> */}
            {allIssuesQuestions.length ? (
              <>
                {allIssuesQuestions.map((issues) => {
                  return (
                    <div className="issue" key={issues.id}>
                      <h3>Title: {issues.title}</h3>
                      <p>Description: {issues.description}</p>
                      <>
                        {issues.questions.length ? (
                          <>
                            {issues.questions.map((question) => (
                              <div
                                className="issue-solution box"
                                key={question.id}
                              >
                                <p>
                                  <strong>Question:</strong>{' '}
                                  {question.questionContent}
                                </p>
                                <div className="answer-field">
                                  <p>
                                    <strong>Answer:</strong>
                                  </p>
                                  <div>
                                    <textarea
                                      type="text"
                                      value={answer[question.id] || ''}
                                      onChange={(event) => {
                                        let newAnswer = { ...answer };
                                        newAnswer[question.id] =
                                          event.target.value;
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
                                </div>
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
              <div className="no-questions">No questions here!</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Issues;
