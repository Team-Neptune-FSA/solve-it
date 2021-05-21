import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';

const codeEnvironment = ({ setSolutionCode, value }) => {
  const [code, setCode] = useState('//enter code here...');
  const [output, setOutput] = useState('');
  const [exitCode, setExitCode] = useState(0);

  useEffect(() => {
    if (value) {
      setCode(value);
    }
  }, [value]);

  const handleSubmit = async () => {
    const { data: output } = await axios.post('/api/execute', { code });
    setOutput(output.formattedOutput);
    setExitCode(output.ExitCode);
  };

  const handleChange = (value) => {
    setSolutionCode(value);
    setCode(value);
  };
  return (
    <div className="ide">
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
            readOnly: false,
            lineHeight: 25,
          }}
        />
        <div className="output-box">
          {Number(exitCode) === 0 ? (
            output
          ) : (
            <span className="error">{output}</span>
          )}
        </div>
      </div>
      <button onClick={() => handleSubmit()}>Run Code</button>
    </div>
  );
};

export default codeEnvironment;
