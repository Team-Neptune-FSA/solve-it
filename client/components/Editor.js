import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';

function codeEnvironment() {
  const [code, setCode] = useState('//enter code here...');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    console.log(code);
    await axios.post('/api/execute', { code });
  };

  const handleChange = (value) => {
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
      {/* <Editor // secondary editor to display the output/console
        height="10vh"
        width="75vw"
        defaultValue=""
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{ readOnly: true }}
      /> */}
      <button onClick={() => handleSubmit()}>Run Code</button>
    </div>
  );
}

export default codeEnvironment;
