import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleIssue } from "../../store/singleIssue";
import CodeEnvironment from "../CodeEnvironment";
import axios from "axios";
import {fetchSingleSolution} from "../../store/singleSolution";

const UnresolvedIssue = ({ match, getSingleIssue, singleIssue, getSingleSolution, singleSolution }) => {
  const [code, setCode] = useState(""); 
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    const { issueId, solutionId } = match.params;
    const solutionCode = async () => {
      const response = await axios.get(
        `/api/issues/${issueId}/solutions/${solutionId}`
        );
        const solution = response.data;
        setCode(solution.code)
        setExplanation(solution.explanation)
    }
    solutionCode();
    // getSingleSolution(issueId, solutionId);
    getSingleIssue(issueId);
  }, []);

  const setSolutionCode = (code) => {
    setCode(code);
  };

  console.log(singleSolution.code);
  // let explanationText = JSON.stringify(singleSolution.code)
  // console.log(explanationText);
  // console.log(singleSolution.code)

  const test = 'hello world'

  if (!singleSolution.code){
    singleSolution.code = "test"
  }

  return (
    <div>
      <h2>{singleIssue.title}</h2>
      <p>{singleIssue.description}</p>
      <button>ACCEPT</button>
      <h1 style={{color:"green"}}>ISSUE RESOLVED</h1>
      <CodeEnvironment value={code} setSolutionCode={setSolutionCode} />
      <br />
      <h2>EXPLANATION SECTION</h2>
      <p>{explanation}</p>
    </div>
  );
};


const mapState = (state) => {
  return {
    singleIssue: state.singleIssue,
    singleSolution: state.singleSolution,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleIssue: (issueId) => dispatch(fetchSingleIssue(issueId)),
    getSingleSolution : (issueId, solutionId) => dispatch(fetchSingleSolution(issueId, solutionId)),
  };
};

export default connect(mapState, mapDispatch)(UnresolvedIssue);
