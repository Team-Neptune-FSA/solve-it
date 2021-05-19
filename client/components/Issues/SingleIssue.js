import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CodeEnvironment from "../CodeEnvironment";
import axios from "axios";

const SingleIssue = ({ match, auth }) => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [singleIssue, setSingleIssue] = useState({});
  const [view, setView] = useState("overview");
  const [titleView, setTitleView] = useState("edit");
  const [descriptionView, setDescriptionView] = useState("edit");

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
    getSingleIssue();
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
    getSolution();
  }, []);

  const handleSubmit = async () => {
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
  };

  const handleSave = async () => {
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
      `/api/issues/${singleIssue.id}`,
      { title, description },
      { headers: { authorization: token } }
    );
  };

  return (
    <>
      {singleIssue.userId === auth.id ? (
        <div className="component">
          <button onClick={() => setView("overview")}>Overview</button>
          <button onClick={() => setView("workspace")}>Workspace</button>

          {view === "overview" ? (
            <div>
              {titleView === "edit" ? (
                <div>
                  <h1>
                    <strong>{title}</strong>
                  </h1>
                  <button onClick={() => setTitleView("submit")}>edit</button>
                </div>
              ) : (
                <div>
                  <label>
                    <input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </label>
                  <button
                    type="submit"
                    onClick={(event) => {
                      handleEdit(event);
                      setTitleView("edit");
                    }}
                  >
                    submit changes
                  </button>
                </div>
              )}

              {descriptionView === "edit" ? (
                <div>
                  <h2>{description}</h2>
                  <button onClick={() => setDescriptionView("submit")}>
                    edit
                  </button>
                </div>
              ) : (
                <div>
                  <label>
                    <input
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </label>
                  <button
                    type="submit"
                    onClick={(event) => {
                      handleEdit(event);
                      setDescriptionView("edit");
                    }}
                  >
                    submit changes
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <CodeEnvironment value={code} setSolutionCode={setSolutionCode} />
              <br />
              <h2>EXPLANATION SECTION</h2>
              <textarea
                onChange={(event) => setExplanation(event.target.value)}
                type="text"
                value={explanation}
                name="name"
              />
              <button onClick={handleSubmit} type="button">
                Submit Solution
              </button>
              <button onClick={handleSave} type="button">
                Save Solution
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="component">
          <button onClick={() => setView("overview")}>Overview</button>
          <button onClick={() => setView("workspace")}>Workspace</button>

          {view === "overview" ? (
            <>
              <h1 className="issueTitle">{singleIssue.title}</h1>
              <p>{singleIssue.description}</p>
            </>
          ) : (
            <>
              <CodeEnvironment value={code} setSolutionCode={setSolutionCode} />
              <br />
              <h2>EXPLANATION SECTION</h2>
              <textarea
                onChange={(event) => setExplanation(event.target.value)}
                type="text"
                value={explanation}
                name="name"
              />

              <button onClick={handleSubmit} type="button">
                Submit Solution
              </button>
              <button onClick={handleSave} type="button">
                Save Solution
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState, null)(SingleIssue);

// {singleIssue.userId === auth.id ? (
//   <div className="component">
//     <div>
//       {titleView === "edit" ? (
//         <div>
//           <h1>
//             <strong>{title}</strong>
//           </h1>
//           <button onClick={() => setTitleView("submit")}>edit</button>
//         </div>
//       ) : (
//         <div>
//           <label>
//             <input
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//             />
//           </label>
//           <button
//             type="submit"
//             onClick={(event) => {
//               handleEdit(event);
//               setTitleView("edit");
//             }}
//           >
//             submit changes
//           </button>
//         </div>
//       )}
//       {descriptionView === "edit" ? (
//         <div>
//           <h2>{description}</h2>
//           <button onClick={() => setDescriptionView("submit")}>
//             edit
//           </button>
//         </div>
//       ) : (
//         <div>
//           <label>
//             <input
//               value={description}
//               onChange={(event) => setDescription(event.target.value)}
//             />
//           </label>
//           <button
//             type="submit"
//             onClick={(event) => {
//               handleEdit(event);
//               setDescriptionView("edit");
//             }}
//           >
//             submit changes
//           </button>
//         </div>
//       )}
//     </div>
//     <CodeEnvironment value={code} setSolutionCode={setSolutionCode} />
//     <br />
//     <h2>EXPLANATION SECTION</h2>
//     <textarea
//       onChange={(event) => setExplanation(event.target.value)}
//       type="text"
//       value={explanation}
//       name="name"
//     />
//     <button onClick={handleSubmit} type="button">
//       Submit Solution
//     </button>
//     <button onClick={handleSave} type="button">
//       Save Solution
//     </button>
//   </div>
// ) : (
//   <div className="component">
//     <h1 className="issueTitle">{singleIssue.title}</h1>
//     <p>{singleIssue.description}</p>
//     <CodeEnvironment value={code} setSolutionCode={setSolutionCode} />
//     <br />
//     <h2>EXPLANATION SECTION</h2>
//     <textarea
//       onChange={(event) => setExplanation(event.target.value)}
//       type="text"
//       value={explanation}
//       name="name"
//     />

//     <button onClick={handleSubmit} type="button">
//       Submit Solution
//     </button>
//     <button onClick={handleSave} type="button">
//       Save Solution
//     </button>
//   </div>
// )}
