import React, { useEffect, useState } from "react";
import CodeEnvironment from "../CodeEnvironment";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "../../history";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useAuth } from "../../context/auth";

toast.configure();
const SingleIssue = ({ match }) => {
  const [dummy, setdummy] = useState(true);
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [editView, setEditView] = useState("edit");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [singleIssue, setSingleIssue] = useState({});
  const [view, setView] = useState("overview");
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionContent, setQuestionContent] = useState("");
  const [answer, setAnswer] = useState({});

  const notifySubmit = () =>
    toast.info("Solution submitted!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  const notifySave = () =>
    toast.info("Solution saved!", { position: toast.POSITION.BOTTOM_RIGHT });
  const { user, isLoggedIn } = useAuth();
  const setSolutionCode = (code) => {
    setCode(code);
  };

  useEffect(() => {
    const { issueId } = match.params;
    const token = window.localStorage.getItem("token");

    const getSingleIssue = async () => {
      const { data: singleIssue } = await axios.get(`/api/issues/${issueId}`);
      setSingleIssue(singleIssue);
      setTitle(singleIssue.title);
      setDescription(singleIssue.description);
    };

    const getSolution = async () => {
      const { data: solution } = await axios.get(
        `/api/issues/${issueId}/mySolution/`,
        { headers: { authorization: token } }
      );
      if (solution) {
        setCode(solution.code);
        setExplanation(solution.explanation);
      }
    };

    const getAllQuestions = async () => {
      const { data: questions } = await axios.get(
        `/api/issues/${issueId}/questions`,
        { headers: { authorization: token } }
      );
      setAllQuestions(questions);
    };

    if (token) {
      getAllQuestions();
      getSingleIssue();
      getSolution();
    }
  }, [dummy]);

  const logginPrompt = () => {
    useEffect(() => {
      confirmAlert({
        message: "Please sign up or log in to view this issue",
        buttons: [
          {
            label: "Login",
            onClick: () => history.push("/login"),
          },
          {
            label: "Signup",
            onClick: () => history.push("/signup"),
          },
          {
            label: "Go Back",
            onClick: () => history.go(-1),
          },
        ],
        closeOnEscape: false,
        closeOnClickOutside: false,
      });
    }, []);
  };

  const confirmSubmit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to submit a new solution?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleSubmit(),
        },
        {
          label: "No",
          onClick: () => console.log("back"),
        },
      ],
    });
  };

  const handleSubmit = async () => {
    notifySubmit();
    const token = window.localStorage.getItem("token");
    const { issueId } = match.params;
    await axios.post(
      `/api/issues/${issueId}/solutions`,
      {
        code: code,
        explanation: explanation,
        issue: singleIssue,
        isSubmitted: true,
      },
      { headers: { authorization: token } }
    );
    history.push("/dashboard");
  };

  const handleSave = async () => {
    notifySave();
    const token = window.localStorage.getItem("token");
    const { issueId } = match.params;
    await axios.post(
      `/api/issues/${issueId}/solutions`,
      { code: code, explanation: explanation, issue: singleIssue },
      { headers: { authorization: token } }
    );
  };

  const handleEdit = async (event) => {
    const token = window.localStorage.getItem("token");
    event.preventDefault();
    await axios.put(
      `/api/issues/${singleIssue.id}/edit`,
      { title, description },
      { headers: { authorization: token } }
    );
  };

  const handleQuestion = async (event) => {
    const token = window.localStorage.getItem("token");
    const { issueId } = match.params;
    event.preventDefault();
    await axios.post(
      `/api/issues/${issueId}/question`,
      { questionContent },
      { headers: { authorization: token } }
    );
    setQuestionContent("");
    setdummy(!dummy);
  };

  const handleAnswer = async (event, questionId) => {
    const token = window.localStorage.getItem("token");
    event.preventDefault();
    const theAnswer = answer[questionId];
    await axios.put(
      // `/api/issues/${issueId}/answer`,
      `/api/issues/questions/${questionId}/answer`,
      { theAnswer },
      { headers: { authorization: token } }
    );
    setdummy(!dummy);
  };

  return (
    <div className="contain-component">
      {window.localStorage.getItem("token") ? (
        <div>
          {singleIssue.userId === user.id ? (
            <div>
              <div className="single-issue-btns">
                <div className="back" onClick={() => history.go(-1)}>
                  <i className="fas fa-chevron-left"></i>
                  Back
                </div>
                <div>
                  <button
                    onClick={() => setView("overview")}
                    className={view === "overview" ? "active-btn" : ""}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setView("workspace")}
                    className={view === "workspace" ? "active-btn" : ""}
                  >
                    Workspace
                  </button>
                </div>
              </div>
              {view === "overview" ? (
                <div className="overview">
                  <div className="info">
                    {editView === "edit" ? (
                      <div>
                        <div className="owner-edit">
                          <h1>{title}</h1>
                          <button onClick={() => setEditView("submit")}>
                            Edit
                          </button>
                        </div>
                        <p>{description}</p>
                      </div>
                    ) : (
                      <div>
                        <div className="edit-overview">
                          <div>
                            <input
                              value={title}
                              onChange={(event) => setTitle(event.target.value)}
                            />
                            <button
                              type="submit"
                              onClick={(event) => {
                                handleEdit(event);
                                setEditView("edit");
                              }}
                            >
                              Submit
                            </button>
                          </div>
                          <textarea
                            value={description}
                            onChange={(event) =>
                              setDescription(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {allQuestions.length ? (
                    <div className="question-section">
                      <p>Answer Questions About This Issue</p>
                      {allQuestions.map((question) => {
                        return (
                          <div key={question.id}>
                            <p>Q: {question.questionContent}</p>
                            <p>
                              A:{" "}
                              {question.answer || (
                                <>
                                  <input
                                    type="text"
                                    value={answer[question.id] || ""}
                                    onChange={(event) => {
                                      let newAnswer = { ...answer };
                                      newAnswer[question.id] =
                                        event.target.value;
                                      setAnswer(newAnswer);
                                    }}
                                    placeholder="Send answer to user..."
                                  />
                                  <button
                                    onClick={(event) =>
                                      handleAnswer(event, question.id)
                                    }
                                  >
                                    Submit Answer
                                  </button>
                                </>
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="workspace">
                  <CodeEnvironment
                    value={code}
                    setSolutionCode={setSolutionCode}
                  />
                  <br />
                  {/* <textarea
                    onChange={(event) => setExplanation(event.target.value)}
                    type="text"
                    value={explanation}
                    name="name"
                  />
                  <button onClick={confirmSubmit} type="button">
                    Submit Solution
                  </button>
                  <button onClick={handleSave} type="button">
                    Save Solution
                  </button> */}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="single-issue-btns">
                <Link to="/issues">
                  <i className="fas fa-chevron-left"></i>
                  Back To Issues
                </Link>
                <div>
                  <button
                    onClick={() => setView("overview")}
                    className={view === "overview" ? "active-btn" : ""}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setView("workspace")}
                    className={view === "workspace" ? "active-btn" : ""}
                  >
                    Workspace
                  </button>
                </div>
              </div>

              {view === "overview" ? (
                <div className="overview">
                  <div className="info">
                    <h1 className="issueTitle">{singleIssue.title}</h1>
                    <p>{singleIssue.description}</p>
                  </div>
                  <div className="question-section">
                    <h2>Questions About This Issue: </h2>
                    <input
                      value={questionContent}
                      onChange={(event) =>
                        setQuestionContent(event.target.value)
                      }
                      placeholder="Ask the owner of this issue a question..."
                    />
                    <button onClick={(event) => handleQuestion(event)}>
                      Ask Question
                    </button>
                    {allQuestions.map((question) => (
                      <div key={question.id}>
                        <p>Q: {question.questionContent}</p>
                        <p>A: {question.answer || ""}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="workspace">
                  <CodeEnvironment
                    value={code}
                    setSolutionCode={setSolutionCode}
                  />
                  <textarea
                    onChange={(event) => setExplanation(event.target.value)}
                    type="text"
                    value={explanation}
                    placeholder="Submit an explanation..."
                    name="name"
                  />
                  <div className="submission-btns">
                    <button
                      onClick={handleSave}
                      type="button"
                      className="white-bg blue"
                    >
                      Save Solution
                    </button>
                    <button onClick={confirmSubmit} type="button">
                      Submit Solution
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>{logginPrompt()}</div>
      )}
    </div>
  );
};

export default SingleIssue;
