import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleIssue } from "../store/singleIssue";
import CodeEnvironment from "./Editor";

class SelectedIssue extends React.Component {
  componentDidMount() {
    const { issueId } = this.props.match.params;
    this.props.getSingleIssue(issueId);
  }
  render() {
    const { singleIssue } = this.props;
    return (
      <div>
        <h2>Prompt: {singleIssue.issueContent}</h2>
        <CodeEnvironment />
        <br />
        <h2>EXPLANATION SECTION</h2>
        <form>
          <label>
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/* <Link to={`${singleIssue.id}/edit`}>
          <button type="button" className="edit-button">
            Edit
          </button>
        </Link> */}
      </div>
    );
  }
}

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

export default connect(mapState, mapDispatch)(SelectedIssue);
