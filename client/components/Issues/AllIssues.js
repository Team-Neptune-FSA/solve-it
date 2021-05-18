import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchIssues } from '../../store/allIssues';

class AllIssues extends React.Component {
  componentDidMount() {
    this.props.fetchIssues();
  }

  render() {
    const { issues } = this.props;
    return (
      <div className="component">
        <div className="search">
          <input
            className="searchbar"
            type="text"
            placeholder="Search.."
          ></input>
        </div>

        <div className="postIssue">
          <Link to="/issues/post">
            <button className="post-issue-button">Post an Issue</button>
          </Link>
        </div>

        <br />

        <div className="allIssues">
          <h1 className="all-issues-title">All Issues</h1>
          {issues.length ? (
            issues
              .map((issue) => (
                <div key={issue.id} className="single-issue">
                  <div className="insideAllIssues">
                    <h2 className="issueTitle">{issue.title}</h2>
                    <p>{issue.description}</p>
                    <Link to={`/issues/${issue.id}`}>
                      <button className="btn blue-bg white">Solve</button>
                    </Link>
                    <h1 className="issue-price">
                      ${(issue.price / 100).toFixed(2)}
                    </h1>
                  </div>
                </div>
              ))
              .reverse()
          ) : (
            <h2 className="none-in-database">There are no issues, sorry.</h2>
          )}
        </div>
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
