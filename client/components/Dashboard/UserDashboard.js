import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import IssueSolver from './IssueSolver';
import IssueAsker from './IssueAsker';

const UserDashboard = ({
  user: { name, problemsSolved, solutionsAccepted },
}) => {
  const [toggle, settoggle] = useState(true);
  return (
    <>
      <div id="title-section">
        <h1>Hello {name}</h1>
      </div>
      <button onClick={() => settoggle(!toggle)}>
        {toggle ? 'Issue Solver' : 'Issue Asker'}
      </button>
      {toggle ? <IssueSolver /> : <IssueAsker />}
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(UserDashboard);
