import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleIssue } from "../../store/singleIssue";
import CodeEnvironment from "../CodeEnvironment";
import axios from "axios";
import Editor from "@monaco-editor/react";

const SingleIssue = ({ match, getSingleIssue, singleIssue }) => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    const { issueId } = match.params;
    getSingleIssue(issueId);
  }, []);

  // axios call to solution related to this issue id and user id that submitted the code.

  return (
    <div>
      <h2>{singleIssue.title}</h2>
      <p>{singleIssue.description}</p>
      <button>ACCEPT</button>
      <Editor
        height="50vh"
        width="75vw"
        value="console.log(`testing`)"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{ readOnly: true }}
      />
      <br />
      <h2>EXPLANATION SECTION</h2>
      <textarea readOnly type="text" name="name" value="this is a test" />
      {/* <Link to={`${singleIssue.id}/edit`}>
          <button type="button" className="edit-button">
            Edit
          </button>
        </Link> */}
    </div>
  );
};

// class SingleIssue extends React.Component {
//   componentDidMount() {
//     const { issueId } = this.props.match.params;
//     this.props.getSingleIssue(issueId);
//   }

//   render() {
//     console.log(this.props);
//     const { singleIssue } = this.props;
//     return (
//       <div>
//         <h2>{singleIssue.title}</h2>
//         <p>{singleIssue.description}</p>
//         <CodeEnvironment />
//         <br />
//         <h2>EXPLANATION SECTION</h2>
//         <form>
//           <label>
//             <textarea type="text" name="name" />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//         {/* <Link to={`${singleIssue.id}/edit`}>
//           <button type="button" className="edit-button">
//             Edit
//           </button>
//         </Link> */}
//       </div>
//     );
//   }
// }

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
