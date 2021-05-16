import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleIssue } from "../../store/singleIssue";
import CodeEnvironment from "../CodeEnvironment";
import axios from "axios";

const SingleIssue = ({ match, getSingleIssue, singleIssue }) => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  // const [solution, setSolution] = useState("");

  useEffect(() => {
    const { issueId } = match.params;
    const token = window.localStorage.getItem("token");
    getSingleIssue(issueId);
    const getSolution = async () => {
      const { data: solution } = await axios.get(`/api/issues/${issueId}/mySolution/`,
      { headers: { authorization: token }})
      if (solution){
        // setSolution(solution)
        setCode(solution.code)
        setExplanation(solution.explanation)
      }
    }
    getSolution();
  }, []);

  const handleSubmit = async () => {
    const token = window.localStorage.getItem("token");
    const { issueId } = match.params;
    await axios.post(
      `/api/issues/${issueId}/solutions`,
      { code: code, explanation: explanation, issue: singleIssue, isSubmitted: true },
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


  const setSolutionCode = (code) => {
    setCode(code);
  };
  return (
    <div className="component">
      <h2>{singleIssue.title}</h2>
      <p>{singleIssue.description}</p>
      <CodeEnvironment value = {code} setSolutionCode={setSolutionCode} />
      <br />
      <h2>EXPLANATION SECTION</h2>
      <textarea
        onChange={(event) => setExplanation(event.target.value)}
        type="text"
        value = {explanation}
        name="name"
      />

      <button onClick={handleSubmit} type="button">
        Submit Solution
      </button>
      <button onClick = {handleSave} type="button">
        Save Solution
      </button>
    </div>
  );
};

const mapState = (state) => {
  return {
    singleIssue: state.singleIssue,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleIssue: (issueId) => dispatch(fetchSingleIssue(issueId)),
  };
};

export default connect(mapState, mapDispatch)(SingleIssue);
