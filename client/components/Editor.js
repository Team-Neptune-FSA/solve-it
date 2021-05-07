import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Editor, { useMonaco } from "@monaco-editor/react";

function App() {
  const monaco = useMonaco();

  const [code, updateCode] = useState("");

const handleSubmit = (event) => {
    // const output = event.target.value;
    console.log(code);
}

//   useEffect(() => {
//     // do conditional chaining
//     monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true); //what does this mean?
//     // or make sure that it exists by other ways
//     if (monaco) {
//       console.log("here is the monaco instance:", monaco);
//     }
//   }, [monaco]);

  return (
    <div>
      <Editor   //main editor
        height="50vh"
        width="75vw"
        defaultValue="console.log('Hello World')"
        defaultLanguage="javascript"
        theme="vs-dark"
        onChange={updateCode}
          options={{ readOnly: false }}
      />
      <br />
      <Editor   // secondary editor to display the output/console
        height="10vh"
        width="75vw"
        defaultValue=""
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{ readOnly: true }}
      />
      <button onClick={ () => handleSubmit() }>Run Code</button>
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default App;
