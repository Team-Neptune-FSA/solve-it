import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIssues } from "../../store/allIssues";

class AllIssues extends React.Component {
  componentDidMount() {
    this.props.fetchIssues();
  }

  render() {
    const {issues} = this.props; return (
      <div className="component">
        <Link to="/issues/post" className="button">
          <h1>Post an Issue</h1>
        </Link>
        <br />
        <h1>All Issues</h1>
        {issues.length ? (
          issues
            .map((issue) => (
              <div key={issue.id} className="single-issue">
                <Link to={`/issues/${issue.id}`}>
                  <h2>{issue.title}</h2>
                  <p>{issue.description}</p>
                </Link>
                <hr />
              </div>
            ))
            .reverse()
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
