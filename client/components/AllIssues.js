import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIssues } from "../store/allIssues";

class AllIssues extends React.Component {
  componentDidMount() {
    this.props.fetchIssues();
  }
  render() {
    const { issues } = this.props;
    console.log(this.props);
    return (
      <div>
        <h1>All Issues</h1>
        {/* <Link to="issues/create">
            <button type="button" className="add-button">
              Add Issue
            </button>
          </Link> */}

        {issues.length ? (
          issues.map((issue) => (
            <div key={issue.id} className="single-issue">
              <Link to={`/issues/${issue.id}`}>
                <h2>Issue: {issue.issueContent}</h2>
              </Link>
            </div>
          ))
        ) : (
          <h2 className="none-in-database">There are no issues, sorry.</h2>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    issues: state.allIssues,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchIssues: () => dispatch(fetchIssues()),
  };
};

export default connect(mapState, mapDispatch)(AllIssues);
