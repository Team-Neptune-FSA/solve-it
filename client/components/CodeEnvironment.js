import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';

function codeEnvironment({ setSolutionCode, value }) {
  const [code, setCode] = useState('//enter code here...');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (value) {
      setCode(value);
    }
  }, [value]); 

  const handleSubmit = async () => {
    const { data: output } = await axios.post('/api/execute', { code });
    setOutput(output);
  };

  const handleChange = (value) => {
    setSolutionCode(value);
    setCode(value);
  };

  return (
    <>
      <h1>Please don't run an infinite loop :)</h1>
      <br />
      <div className="code-environment-container">
        <Editor
          height="50vh"
          width="75vw"
          fontsize="12px"
          value={code}
          defaultLanguage="javascript"
          theme="vs-dark"
          onChange={handleChange}
          options={{ 
            readOnly: false
          }}
        />
        <br />
        <div className="output-box">{output}</div>
      </div>
      <button onClick={() => handleSubmit()}>Run Code</button>
    </>
  );
}

export default codeEnvironment;
