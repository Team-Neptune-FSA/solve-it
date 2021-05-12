import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleIssue } from "../../store/singleIssue";
import CodeEnvironment from "../CodeEnvironment";
import axios from "axios";

const SingleIssue = ({ match, getSingleIssue, singleIssue }) => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    const { issueId } = match.params;
    getSingleIssue(issueId);
  }, []);

  const handleSubmit = async () => {
    const token = window.localStorage.getItem("token");
    const { issueId } = match.params;
    await axios.post(
      `/api/issues/${issueId}/solutions`,
      { code: code, explanation: explanation, issue: singleIssue },
      { headers: { authorization: token } }
    );
  };

  const setSolutionCode = (code) => {
    setCode(code);
  };
  return (
    <div>
      <h2>{singleIssue.title}</h2>
      <p>{singleIssue.description}</p>
      <CodeEnvironment setSolutionCode={setSolutionCode} />
      <br />
      <h2>EXPLANATION SECTION</h2>
      <textarea
        onChange={(event) => setExplanation(event.target.value)}
        type="text"
        name="name"
      />
      {/* <Link to={`${singleIssue.id}/edit`}>
          <button type="button" className="edit-button">
            Edit
          </button>
        </Link> */}

      <button onClick={handleSubmit} type="button">
        Submit Solution
      </button>
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
