import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const IssueAsker = ({ user: { name, issuesAsked, solutionsAccepted } }) => {
  return (
    <>
      <div id="info-section">You have raised {issuesAsked} issues.</div>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(IssueAsker);
