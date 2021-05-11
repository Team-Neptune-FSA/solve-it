import React from "react";
import { connect } from "react-redux";
import CodeEnvironment from "./Editor";
import SingleQuestion from "./SingleQuestion";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>

      <SingleQuestion />

      {/* <CodeEnvironment /> */}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
