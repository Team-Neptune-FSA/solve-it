import React, { useEffect, useState } from "react";
import CodeEnvironment from "../CodeEnvironment";
import axios from "axios";

const UnresolvedIssue = ({ match }) => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [issue, setIssue] = useState({});

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
    <div>
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
      <button>ACCEPT</button>
      <h1 style={{ color: "green" }}>ISSUE RESOLVED</h1>
      <CodeEnvironment value={code} setSolutionCode={setSolutionCode} />
      <br />
      <h2>EXPLANATION SECTION</h2>
      <p>{explanation}</p>
    </div>
  );
};

export default UnresolvedIssue;
