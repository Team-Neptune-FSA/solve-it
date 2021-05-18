import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

function codeEnvironment({ setSolutionCode, value }) {
  const [code, setCode] = useState("//enter code here...");
  const [output, setOutput] = useState("");

  useEffect(() => {
    console.log(value); //returns undefined
    if (value) {
      setCode(value);
    }
  }, [value]); //this renders the value from the DB if present???

  const handleSubmit = async () => {
    console.log(code);
    const { data: output } = await axios.post("/api/execute", { code });
    setOutput(output);
  };

  const handleChange = (value) => {
    setSolutionCode(value);
    setCode(value);
  };

  return (
    <div>
      <div className="editor">
        <Editor //main editor
          height="50vh"
          width="75vw"
          value={code}
          defaultLanguage="javascript"
          theme="vs-dark"
          onChange={handleChange}
          options={{ readOnly: false }}
        />
      </div>
      
      <br />

      <div>{output}</div>

      <button onClick={() => handleSubmit()}>Run Code</button>
    </div>
  );
}

export default codeEnvironment;
