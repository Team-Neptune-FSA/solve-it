import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';

function codeEnvironment({setSolutionCode}) {
  const [code, setCode] = useState('//enter code here...');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    console.log(code);
    const { data: output } = await axios.post('/api/execute', { code });
    setOutput(output);
  };

  const handleChange = (value) => {
    setSolutionCode(value);
    setCode(value);
  };

  return (
    <div>
      <Editor //main editor
        height="50vh"
        width="75vw"
        value={code}
        defaultLanguage="javascript"
        theme="vs-dark"
        onChange={handleChange}
        options={{ readOnly: false }}
      />
      <br />
      
      <div>{output}</div> {/* this is where the output lives */}

      <button onClick={() => handleSubmit()}>Run Code</button>

    </div>
  );
}

export default codeEnvironment;