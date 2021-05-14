import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { name } = props;

  return (
    <div>
      <h3>Welcome {name ? name : 'Guest'}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.auth.name,
  };
};

export default connect(mapState)(Home);
