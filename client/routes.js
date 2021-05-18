import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import { me } from './store';
import Home from './components/Home';
import AllIssues from './components/Issues/AllIssues';
import SingleIssue from './components/Issues/SingleIssue';
import UserDashboard from './components/Dashboard/UserDashboard';
import PostIssue from './components/Issues/PostIssue';
import UnresolvedIssue from './components/Issues/UnresolvedIssue';
import router from '../server/api/issues';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/issues" component={AllIssues} />
            <Route exact path="/issues/post" component={PostIssue} />
            <Route exact path="/issues/:issueId" component={SingleIssue} />
            <Route
              exact
              path="/issues/:issueId/solutions/:solutionId"
              component={UnresolvedIssue}
            />
            <Route exact path="/dashboard" component={UserDashboard} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/issues" component={AllIssues} />
            <Route exact path="/issues/post" component={PostIssue} />
            {/* <Route exact path="/issues/:issueId">
              <Redirect to="/login" />
            </Route> */}
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
