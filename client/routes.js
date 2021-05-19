import React, { useEffect } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AllIssues from "./components/Issues/AllIssues";
import SingleIssue from "./components/Issues/SingleIssue";
import UserDashboard from "./components/Dashboard/UserDashboard";
import PostIssue from "./components/Issues/PostIssue";
import UnresolvedIssue from "./components/Issues/UnresolvedIssue";
import { useAuth } from "./context/auth";

const Routes = () => {
  const { getCurrentUser, isLoggedIn } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      await getCurrentUser();
    };
    authenticate();
  }, []);

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
          <Route
            exact
            path="/login"
            render={() => <Login name="login" displayName="Log In" />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup name="signup" displayName="Sign Up" />}
          />
          <Route exact path="/issues" component={AllIssues} />
          <Route exact path="/issues/post" component={PostIssue} />
          <Route exact path="/issues/:issueId" component={SingleIssue} />
        </Switch>
      )}
    </div>
  );
};

export default withRouter(Routes);
