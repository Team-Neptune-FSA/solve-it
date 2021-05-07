// import styled from "styled-components"  //allows us style components directly in the component file.
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import Editor, { useMonaco } from "@monaco-editor/react";

function App() {
  const monaco = useMonaco();
  
  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true); //what does this mean?
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  return (
    <Editor
      height="50vh"
      width="75vw"
      defaultValue="// some comment"
      defaultLanguage="javascript"
      theme="vs-dark"
      readOnly={true}
    //   onChange...
    />
  );
}

// const Editor = styled.div`
// background-color: black;
// `;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default App;